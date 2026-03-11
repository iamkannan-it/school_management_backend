import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
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

class EmergencyContactDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  relationship?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  alternatePhone?: string;
}

class MedicalInfoDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  allergies?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  medicalConditions?: string;
}

export class CreateStudentDto {
  @ApiProperty({ example: 'STU001' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Michael', required: false })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  @IsEnum(['Male', 'Female', 'Other'])
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: '2010-05-15' })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({ example: 'student@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '1234567890', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  alternatePhone?: string;

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto;

  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ example: '15', required: false })
  @IsString()
  @IsOptional()
  rollNumber?: string;

  @ApiProperty({ example: 'ADM2025001', required: false })
  @IsString()
  @IsOptional()
  admissionNumber?: string;

  @ApiProperty({ example: '2025-01-15', required: false })
  @IsDateString()
  @IsOptional()
  admissionDate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  previousSchool?: string;

  @ApiProperty({ example: 'General', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  religion?: string;

  @ApiProperty({ example: 'Indian', required: false })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  motherTongue?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  parents?: string[];

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  @IsOptional()
  emergencyContact?: EmergencyContactDto;

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => MedicalInfoDto)
  @IsOptional()
  medicalInfo?: MedicalInfoDto;

  @ApiProperty({ example: 'john.doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
