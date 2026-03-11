import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Class extends Document {
  @Prop({ required: true, unique: true })
  classId: string;

  @Prop({ required: true })
  className: string;

  @Prop({ required: true })
  grade: string;

  @Prop()
  section: string;

  @Prop()
  academicYear: string;

  @Prop({ type: Types.ObjectId, ref: 'Staff' })
  classTeacherId: Types.ObjectId;

  @Prop()
  room: string;

  @Prop()
  capacity: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Staff' }], default: [] })
  subjectTeachers: Types.ObjectId[];

  @Prop()
  schedule: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
