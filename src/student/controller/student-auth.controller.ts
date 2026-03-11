import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StudentAuthService } from '../services/student-auth.service';
import { StudentLoginDto } from '../DTO/student-login.dto';

@ApiTags('Student Auth')
@Controller('student-auth')
export class StudentAuthController {
  constructor(private readonly studentAuthService: StudentAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Student login' })
  login(@Body() studentLoginDto: StudentLoginDto) {
    return this.studentAuthService.login(studentLoginDto);
  }
}
