import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { Category } from '../categories/schemas/category.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>,@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(productDto: any): Promise<Product> {
    const product = new this.productModel(productDto);
    return product.save();
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    return this.productModel.find({ price: { $gte: minPrice, $lte: maxPrice } }).exec();
  }

  async findByCategoryName(categoryName: string): Promise<Product[]> {
    const category = await this.categoryModel.findOne({ name: categoryName }).exec();
    if (!category) {
      return []
    }
    return this.productModel.find({ category: category._id }).exec(); 
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, productDto: any): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
