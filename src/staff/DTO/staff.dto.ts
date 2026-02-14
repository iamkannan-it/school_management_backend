import { ApiProperty, PartialType } from "@nestjs/swagger";

import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

/* -------------------- Enums -------------------- */

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum Role {
  TEACHER = 'Teacher',
  ADMIN = 'Admin',
  PRINCIPAL = 'Principal',
  ACCOUNTANT = 'Accountant',
  CLERK = 'Clerk',
  DRIVER = 'Driver',
  LIBRARIAN = 'Librarian',
  OTHER = 'Other',
}

export enum EmploymentType {
  PERMANENT = 'Permanent',
  CONTRACT = 'Contract',
  TEMPORARY = 'Temporary',
  PART_TIME = 'Part-Time',
}

/* -------------------- Sub DTOs -------------------- */

export class AddressDto {
  @ApiProperty()
  @IsString()
  addressLine1?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiProperty()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsString()
  pincode?: string;

  @ApiProperty()
  @IsString()
  country?: string;
}

export class BankDetailsDto {
  @ApiProperty()
  @IsString()
  accountNumber?: string;

  @ApiProperty()
  @IsString()
  bankName?: string;

  @ApiProperty()
  @IsString()
  ifscCode?: string;
}

/* -------------------- Main Create DTO -------------------- */

export class CreateStaffDto {
  @ApiProperty()
  @IsString()
  staffId?: string;

  @ApiProperty()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  alternatePhone?: string;

  @ApiProperty({ type: AddressDto })
  address?: AddressDto;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role?: Role;

  @ApiProperty()
  @IsString()
  departmentId?: string;

  @ApiProperty()
  @IsString()
  designation?: string;

  @ApiProperty()
  @IsDateString()
  joiningDate?: string;

  @ApiProperty({ enum: EmploymentType })
  @IsEnum(EmploymentType)
  employmentType?: EmploymentType;

  @ApiProperty()
  @IsNumber()
  salary?: number;

  @ApiProperty()
  @IsString()
  qualification?: string;

  @ApiProperty()
  @IsNumber()
  experienceYears?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reportingTo?: string;

  @ApiProperty()
  @IsString()
  username?: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty({ type: BankDetailsDto })
  bankDetails?: BankDetailsDto;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

/* -------------------- Update DTO -------------------- */

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
