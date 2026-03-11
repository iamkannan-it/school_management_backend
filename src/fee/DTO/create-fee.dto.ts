import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PaymentDto {
  @ApiProperty({ example: 5000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '2025-03-09' })
  @IsDateString()
  @IsNotEmpty()
  paymentDate: Date;

  @ApiProperty({ example: 'Cash', enum: ['Cash', 'Card', 'Online', 'Cheque', 'Bank Transfer'] })
  @IsEnum(['Cash', 'Card', 'Online', 'Cheque', 'Bank Transfer'])
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({ example: 'TXN123456789', required: false })
  @IsString()
  @IsOptional()
  transactionId?: string;

  @ApiProperty({ example: 'RCP001', required: false })
  @IsString()
  @IsOptional()
  receiptNumber?: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439013', required: false })
  @IsMongoId()
  @IsOptional()
  collectedBy?: string;
}

export class CreateFeeDto {
  @ApiProperty({ example: 'FEE001' })
  @IsString()
  @IsNotEmpty()
  feeId: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439012' })
  @IsMongoId()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ example: '2025-2026' })
  @IsString()
  @IsNotEmpty()
  academicYear: string;

  @ApiProperty({ example: 'Tuition', enum: ['Tuition', 'Transport', 'Library', 'Lab', 'Sports', 'Exam', 'Other'] })
  @IsEnum(['Tuition', 'Transport', 'Library', 'Lab', 'Sports', 'Exam', 'Other'])
  @IsNotEmpty()
  feeType: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  paidAmount?: number;

  @ApiProperty({ example: '2025-06-30' })
  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({ required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentDto)
  @IsOptional()
  payments?: PaymentDto[];

  @ApiProperty({ example: 'Annual tuition fee', required: false })
  @IsString()
  @IsOptional()
  remarks?: string;
}
