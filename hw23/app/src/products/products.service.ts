import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const lastId = this.products[this.products.length - 1]?.id || 0;
    const newProduct = {
      id: lastId + 1,
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(hasActiveSubscription: boolean) {
    if (!hasActiveSubscription) {
      return this.products;
    }

    const discount = 0.2;

    return this.products.map((p) => ({
      ...p,
      price: p.price * (1 - discount),
    }));
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);
    const updateReq: Product = { ...product };

    if (updateProductDto.price) updateReq.price = updateProductDto.price;
    if (updateProductDto.name) updateReq.name = updateProductDto.name;
    if (updateProductDto.category)
      updateReq.category = updateProductDto.category;
    if (updateProductDto.description)
      updateReq.description = updateProductDto.description;
    if (updateProductDto.quantity)
      updateReq.quantity = updateProductDto.quantity;

    const index = this.products.findIndex((e) => e.id === id);
    this.products[index] = updateReq;

    return updateReq;
  }

  remove(id: number) {
    const index = this.products.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException('product not found');
    }
    this.products.splice(index, 1);
  }
}
