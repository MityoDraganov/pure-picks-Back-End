import { IsNotEmpty } from 'class-validator';
import { ICart } from '../Interfaces/ICart.interface';

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
