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

@Schema({ _id: false, versionKey: false })
export class EmergencyContact {
  @Prop()
  name: string;

  @Prop()
  relationship: string;

  @Prop()
  phone: string;

  @Prop()
  alternatePhone: string;
}

@Schema({ _id: false, versionKey: false })
export class MedicalInfo {
  @Prop()
  bloodGroup: string;

  @Prop()
  allergies: string;

  @Prop()
  medicalConditions: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Student extends Document {
  @Prop({ required: true, unique: true })
  studentId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  middleName: string;

  @Prop({ required: true, enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  alternatePhone: string;

  @Prop({ type: Address })
  address: Address;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop()
  rollNumber: string;

  @Prop()
  admissionNumber: string;

  @Prop()
  admissionDate: Date;

  @Prop()
  previousSchool: string;

  @Prop()
  category: string;

  @Prop()
  religion: string;

  @Prop()
  nationality: string;

  @Prop()
  motherTongue: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Parent' }], default: [] })
  parents: Types.ObjectId[];

  @Prop({ type: EmergencyContact })
  emergencyContact: EmergencyContact;

  @Prop({ type: MedicalInfo })
  medicalInfo: MedicalInfo;

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

export const StudentSchema = SchemaFactory.createForClass(Student);
