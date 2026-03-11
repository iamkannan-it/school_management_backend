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

export class AddPaymentDto {
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
