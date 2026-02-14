import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StaffDocument = Staff & Document;



@Schema({ versionKey: false })
class Address {
  @Prop({type: String})
  addressLine1!: string;

  @Prop({type: String})
  addressLine2!: string;

  @Prop({type: String})
  city!: string;

  @Prop({type: String})
  state!: string;

  @Prop({type: String})
  pincode!: string;

  @Prop({type: String})
  country!: string;
}

@Schema({ versionKey: false })
class BankDetails {
  @Prop({type: String})
  accountNumber!: string;

  @Prop({type: String})
  bankName!: string;

  @Prop({type: String})
  ifscCode!: string;
}

/* -------------------- Main Schema -------------------- */

@Schema({ versionKey: false, timestamps: true })
export class Staff {

  @Prop({ required: true, unique: true })
  staffId?: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop({type: String})
  lastName!: string;

  @Prop({ enum: ['Male', 'Female', 'Other'] })
  gender!: string;

  @Prop({type: String})
  dateOfBirth!: Date;

  @Prop({ unique: true })
  email!: string;

  @Prop({type: String})
  phone!: string;

  @Prop({type: String})
  alternatePhone!: string;

  @Prop({ type: Address })
  address!: Address;

  @Prop({
    enum: [
      'Teacher',
      'Admin',
      'Principal',
      'Accountant',
      'Clerk',
      'Driver',
      'Librarian',
      'Other',
    ],
  })
  role!: string;

  @Prop({type: String})
  departmentId!: string;

  @Prop({type: String})
  designation!: string;

  @Prop({type: String})
  joiningDate!: Date;

  @Prop({
    enum: ['Permanent', 'Contract', 'Temporary', 'Part-Time'],
  })
  employmentType!: string;

  @Prop({type: String})
  salary!: number;

  @Prop({type: String})
  qualification!: string;

  @Prop({type: String})
  experienceYears!: number;

  @Prop({type: String})
  reportingTo!: string; // reference to another staff _id

  @Prop({type: String})
  username!: string;

  @Prop({type: String})
  passwordHash!: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop({ type: BankDetails })
  bankDetails!: BankDetails;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
