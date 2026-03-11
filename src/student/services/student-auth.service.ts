import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { StudentService } from './student.service';
import { StudentLoginDto } from '../DTO/student-login.dto';

@Injectable()
export class StudentAuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(studentLoginDto: StudentLoginDto) {
    const student = await this.studentService.findByUsername(
      studentLoginDto.username,
    );

    if (!student) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!student.isActive) {
      throw new UnauthorizedException('Student account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(
      studentLoginDto.password,
      student.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      studentId: student.studentId,
      email: student.email,
      sub: student._id,
      userType: 'student',
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '5m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '24h',
    });

    const studentObject = student.toObject();
    delete studentObject.password;

    return {
      student: studentObject,
      accessToken,
      refreshToken,
    };
  }
}
