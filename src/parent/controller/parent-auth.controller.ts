import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParentAuthService } from '../services/parent-auth.service';
import { ParentLoginDto } from '../DTO/parent-login.dto';

@ApiTags('Parent Auth')
@Controller('parent-auth')
export class ParentAuthController {
  constructor(private readonly parentAuthService: ParentAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Parent login' })
  login(@Body() parentLoginDto: ParentLoginDto) {
    return this.parentAuthService.login(parentLoginDto);
  }
}
