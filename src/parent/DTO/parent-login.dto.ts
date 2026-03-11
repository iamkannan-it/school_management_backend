import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ParentLoginDto {
  @ApiProperty({
    description: 'Parent username or parentId',
    example: 'robert.doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Parent password',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
