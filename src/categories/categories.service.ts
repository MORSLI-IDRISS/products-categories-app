import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(categoryDto: any): Promise<Category> {
    const category = new this.categoryModel(categoryDto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, categoryDto: any): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, categoryDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
