import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsNumber,
  IsMongoId,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  addressLine1?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  addressLine2?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  pincode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  country?: string;
}

export class CreateParentDto {
  @ApiProperty({ example: 'PAR001' })
  @IsString()
  @IsNotEmpty()
  parentId: string;

  @ApiProperty({ example: 'Robert' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'James', required: false })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  @IsEnum(['Male', 'Female', 'Other'])
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: 'parent@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '9876543211', required: false })
  @IsString()
  @IsOptional()
  alternatePhone?: string;

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto;

  @ApiProperty({
    example: 'Father',
    enum: ['Father', 'Mother', 'Guardian', 'Other'],
  })
  @IsEnum(['Father', 'Mother', 'Guardian', 'Other'])
  @IsNotEmpty()
  relationship: string;

  @ApiProperty({ example: 'Engineer', required: false })
  @IsString()
  @IsOptional()
  occupation?: string;

  @ApiProperty({ example: 1000000, required: false })
  @IsNumber()
  @IsOptional()
  annualIncome?: number;

  @ApiProperty({ example: 'Bachelor of Engineering', required: false })
  @IsString()
  @IsOptional()
  qualification?: string;

  @ApiProperty({
    example: ['507f1f77bcf86cd799439011'],
    required: false,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  students?: string[];

  @ApiProperty({ example: 'robert.doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
