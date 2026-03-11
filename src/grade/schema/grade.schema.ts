import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Grade extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true, enum: ['Midterm', 'Final', 'Quiz', 'Assignment', 'Project', 'Other'] })
  examType: string;

  @Prop({ required: true })
  examName: string;

  @Prop()
  examDate: Date;

  @Prop({ required: true })
  marksObtained: number;

  @Prop({ required: true })
  totalMarks: number;

  @Prop()
  percentage: number;

  @Prop()
  grade: string;

  @Prop()
  remarks: string;

  @Prop({ type: Types.ObjectId, ref: 'Staff' })
  gradedBy: Types.ObjectId;

  @Prop()
  academicYear: string;

  @Prop()
  term: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);

GradeSchema.pre('save', function (next) {
  if (this.marksObtained && this.totalMarks) {
    this.percentage = (this.marksObtained / this.totalMarks) * 100;
  }
  next();
});
