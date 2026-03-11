import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false, versionKey: false })
export class Address {
  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  pincode: string;

  @Prop()
  country: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Parent extends Document {
  @Prop({ required: true, unique: true })
  parentId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  middleName: string;

  @Prop({ required: true, enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  alternatePhone: string;

  @Prop({ type: Address })
  address: Address;

  @Prop({
    required: true,
    enum: ['Father', 'Mother', 'Guardian', 'Other'],
  })
  relationship: string;

  @Prop()
  occupation: string;

  @Prop()
  annualIncome: number;

  @Prop()
  qualification: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }], default: [] })
  students: Types.ObjectId[];

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
