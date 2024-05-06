import { IsNotEmpty} from 'class-validator';
import { IProduct } from 'src/Interfaces/Product.interface';


export class OrderDto {
  @IsNotEmpty()
  orderedItems: [{
    product: IProduct,
    quantity: number
  }]
}
