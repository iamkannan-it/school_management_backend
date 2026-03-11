import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsMongoId,
  IsArray,
} from 'class-validator';

export class CreateClassDto {
  @ApiProperty({
    description: 'Unique class identifier',
    example: 'CLS001',
  })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({
    description: 'Name of the class',
    example: 'Mathematics A',
  })
  @IsString()
  @IsNotEmpty()
  className: string;

  @ApiProperty({
    description: 'Grade level',
    example: '10',
  })
  @IsString()
  @IsNotEmpty()
  grade: string;

  @ApiProperty({
    description: 'Section of the class',
    example: 'A',
    required: false,
  })
  @IsString()
  @IsOptional()
  section?: string;

  @ApiProperty({
    description: 'Academic year',
    example: '2025-2026',
    required: false,
  })
  @IsString()
  @IsOptional()
  academicYear?: string;

  @ApiProperty({
    description: 'Class teacher MongoDB ObjectId',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  classTeacherId?: string;

  @ApiProperty({
    description: 'Room number or location',
    example: 'Room 201',
    required: false,
  })
  @IsString()
  @IsOptional()
  room?: string;

  @ApiProperty({
    description: 'Maximum capacity of students',
    example: 40,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @ApiProperty({
    description: 'Array of subject teacher MongoDB ObjectIds',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    required: false,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  subjectTeachers?: string[];

  @ApiProperty({
    description: 'Class schedule information',
    example: 'Mon-Fri 9:00 AM - 3:00 PM',
    required: false,
  })
  @IsString()
  @IsOptional()
  schedule?: string;
}
