import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthServiceService } from '../services/auth-service.service';
import { LoginDto } from '../DTO/auth.dto';

@Controller('auth')
@ApiTags('/auth')
export class AuthServiceController {
    constructor(
        private readonly authService: AuthServiceService
    ) { }

    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Body() req: LoginDto) {
        const response = await this.authService.login(req);
        return response;
    }
}
