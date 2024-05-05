import { IsNotEmpty} from 'class-validator';
import { IProduct } from 'src/Interfaces/Product.interface';


export class OrderDto {
  @IsNotEmpty()
  products: [{
    product: IProduct,
    quantity: number
  }]
}
