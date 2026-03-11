import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StudentLoginDto {
  @ApiProperty({
    description: 'Student username or studentId',
    example: 'john.doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Student password',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
