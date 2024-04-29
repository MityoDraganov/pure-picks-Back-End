import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

//   @Prop()
//   token: string;

//   @Prop()
//   pfp: string;

  @Prop({default: "buyer", enum: ["buyer", "seller", "deliverer", "admin"]})
  type: string
}


export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
  }
});