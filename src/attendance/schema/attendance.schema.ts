import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Attendance extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({
    required: true,
    enum: ['Present', 'Absent', 'Late', 'Excused', 'Half-Day'],
  })
  status: string;

  @Prop()
  remarks: string;

  @Prop({ type: Types.ObjectId, ref: 'Staff' })
  markedBy: Types.ObjectId;

  @Prop()
  period: string;

  @Prop()
  subject: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
