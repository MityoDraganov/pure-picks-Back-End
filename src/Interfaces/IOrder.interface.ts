import { DeliveryAddress } from 'src/Schemas/DeliveryAddress.schema';
import { Product } from 'src/Schemas/Product.schema';
import { Types } from 'mongoose';
import { User } from 'src/Schemas/User.schema';

export interface IOrder {
  _id: Types.ObjectId;
  buyer: User;
  deliverer: User;
  status: string;

  orderedItems: [
    {
      product: Product;
      quantity: number;
    },
  ];

  deliveryAddress: DeliveryAddress;

  deliveryNote: string;

  readonly putDate: Date;

  totalCp: number;
}
