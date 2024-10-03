import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async register(email: string, password: string, role: string = 'user'): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword, role }); 
    return user.save();
  }


  async login(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '1d' });

    // Store refresh token in user document
    user.refreshToken = refresh_token;
    await user.save();

    return { access_token, refresh_token };
  }

  async refreshToken(userId: string, refreshToken: string): Promise<{ access_token: string }> {
    const user = await this.userModel.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async logout(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: null }); 
  }
}
