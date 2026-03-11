import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsMongoId,
} from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439012' })
  @IsMongoId()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ example: '2025-03-09' })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    example: 'Present',
    enum: ['Present', 'Absent', 'Late', 'Excused', 'Half-Day'],
  })
  @IsEnum(['Present', 'Absent', 'Late', 'Excused', 'Half-Day'])
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 'Medical appointment', required: false })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439013', required: false })
  @IsMongoId()
  @IsOptional()
  markedBy?: string;

  @ApiProperty({ example: 'Period 1', required: false })
  @IsString()
  @IsOptional()
  period?: string;

  @ApiProperty({ example: 'Mathematics', required: false })
  @IsString()
  @IsOptional()
  subject?: string;
}
