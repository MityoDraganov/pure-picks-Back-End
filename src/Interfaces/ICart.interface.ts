import { IProduct } from "./Product.interface";

export interface ICart {
    product: IProduct;
    quantity: number;
  }