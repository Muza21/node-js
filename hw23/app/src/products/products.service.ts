import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const created = await this.productModel.create(createProductDto);
    return created;
  }

  async findAll(hasActiveSubscription: boolean) {
    const products = await this.productModel.find().lean();

    if (!hasActiveSubscription) return products;

    const discount = 0.2;
    return products.map((p) => ({
      ...p,
      price: p.price * (1 - discount),
    }));
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).lean();
    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updated = await this.productModel
      .findByIdAndUpdate(id, { $set: updateProductDto }, { new: true })
      .lean();

    if (!updated) throw new NotFoundException('product not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.productModel.findByIdAndDelete(id).lean();
    if (!deleted) throw new NotFoundException('product not found');
    return deleted;
  }
}
