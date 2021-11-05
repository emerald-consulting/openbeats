import { Module } from '@nestjs/common';
import CategoriesController from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoriesService from './categories.service';
import Category from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
