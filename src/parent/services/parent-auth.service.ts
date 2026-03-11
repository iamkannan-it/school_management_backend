import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { ParentService } from './parent.service';
import { ParentLoginDto } from '../DTO/parent-login.dto';

@Injectable()
export class ParentAuthService {
  constructor(
    private parentService: ParentService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(parentLoginDto: ParentLoginDto) {
    const parent = await this.parentService.findByUsername(
      parentLoginDto.username,
    );

    if (!parent) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!parent.isActive) {
      throw new UnauthorizedException('Parent account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(
      parentLoginDto.password,
      parent.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      parentId: parent.parentId,
      email: parent.email,
      sub: parent._id,
      userType: 'parent',
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '5m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '24h',
    });

    const parentObject = parent.toObject();
    delete parentObject.password;

    return {
      parent: parentObject,
      accessToken,
      refreshToken,
    };
  }
}
