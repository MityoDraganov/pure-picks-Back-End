import { ICart } from '../../dist/pure-picks/client/src/Interfaces/Cart.interface';
import { IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  orderedItems: ICart[]

  @IsNotEmpty()
  deliveryAddress: {
    latitude: number;
    longitude: number;
  }
  deliveryNote: string;
}
