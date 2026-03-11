import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsMongoId,
  IsNumber,
} from 'class-validator';

export class CreateGradeDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439012' })
  @IsMongoId()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ example: 'Mathematics' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    example: 'Midterm',
    enum: ['Midterm', 'Final', 'Quiz', 'Assignment', 'Project', 'Other'],
  })
  @IsEnum(['Midterm', 'Final', 'Quiz', 'Assignment', 'Project', 'Other'])
  @IsNotEmpty()
  examType: string;

  @ApiProperty({ example: 'Midterm Examination 2025' })
  @IsString()
  @IsNotEmpty()
  examName: string;

  @ApiProperty({ example: '2025-03-15', required: false })
  @IsDateString()
  @IsOptional()
  examDate?: Date;

  @ApiProperty({ example: 85 })
  @IsNumber()
  @IsNotEmpty()
  marksObtained: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  totalMarks: number;

  @ApiProperty({ example: 'A', required: false })
  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty({ example: 'Excellent performance', required: false })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439013', required: false })
  @IsMongoId()
  @IsOptional()
  gradedBy?: string;

  @ApiProperty({ example: '2025-2026', required: false })
  @IsString()
  @IsOptional()
  academicYear?: string;

  @ApiProperty({ example: 'First Term', required: false })
  @IsString()
  @IsOptional()
  term?: string;
}
