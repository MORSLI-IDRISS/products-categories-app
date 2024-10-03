import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { CategoriesService } from './categories.service';
import { Category } from './schemas/category.schema';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard,RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles('Admin','Manager')
  create(@Body() categoryDto: any): Promise<Category> {
    return this.categoriesService.create(categoryDto);
  }

  @Get()
  @Roles('Admin','Manager','Clinet')
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Roles('Admin','Manager','Clinet')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @Roles('Admin','Manager')
  update(@Param('id') id: string, @Body() categoryDto: any): Promise<Category> {
    return this.categoriesService.update(id, categoryDto);
  }

  @Delete(':id')
  @Roles('Admin')
  remove(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.remove(id);
  }
}
