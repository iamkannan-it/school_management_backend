import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false, versionKey: false })
export class Payment {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  paymentDate: Date;

  @Prop({ required: true, enum: ['Cash', 'Card', 'Online', 'Cheque', 'Bank Transfer'] })
  paymentMethod: string;

  @Prop()
  transactionId: string;

  @Prop()
  receiptNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Staff' })
  collectedBy: Types.ObjectId;
}

@Schema({ timestamps: true, versionKey: false })
export class Fee extends Document {
  @Prop({ required: true, unique: true })
  feeId: string;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ required: true })
  academicYear: string;

  @Prop({ required: true, enum: ['Tuition', 'Transport', 'Library', 'Lab', 'Sports', 'Exam', 'Other'] })
  feeType: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 0 })
  paidAmount: number;

  @Prop({ default: 0 })
  remainingAmount: number;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true, enum: ['Pending', 'Partial', 'Paid', 'Overdue'], default: 'Pending' })
  status: string;

  @Prop({ type: [Payment], default: [] })
  payments: Payment[];

  @Prop()
  remarks: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const FeeSchema = SchemaFactory.createForClass(Fee);

FeeSchema.pre('save', function (next) {
  this.remainingAmount = this.totalAmount - this.paidAmount;

  if (this.paidAmount >= this.totalAmount) {
    this.status = 'Paid';
  } else if (this.paidAmount > 0) {
    this.status = 'Partial';
  } else if (new Date() > this.dueDate) {
    this.status = 'Overdue';
  } else {
    this.status = 'Pending';
  }

  next();
});
