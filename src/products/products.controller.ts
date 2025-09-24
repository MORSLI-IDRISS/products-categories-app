import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard,RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('Admin','Manager')
  create(@Body() productDto: any): Promise<Product> {
    return this.productsService.create(productDto);
  }

  @Get('price')
  @Roles('Admin','Manager','Client')
  findByPriceRange(@Query('minPrice') minPrice: number, @Query('maxPrice') maxPrice: number): Promise<Product[]> {
    return this.productsService.findByPriceRange(minPrice, maxPrice);
  }

  @Get('category')
  @Roles('Admin','Manager','Client')
  findByCategoryName(@Query('name') categoryName: string): Promise<Product[]> {
    return this.productsService.findByCategoryName(categoryName);
  }

  @Get()
  @Roles('Admin','Manager','Client')
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles('Admin','Manager','Client')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @Roles('Admin','Manager')
  update(@Param('id') id: string, @Body() productDto: any): Promise<Product> {
    return this.productsService.update(id, productDto);
  }

  @Delete(':id')
  @Roles('Admin')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }
}
