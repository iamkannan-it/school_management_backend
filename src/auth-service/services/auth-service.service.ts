import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Staff, StaffDocument } from '../../staff/schema/staff.schema';
import { LoginDto } from '../DTO/auth.dto';

@Injectable()
export class AuthServiceService {
    constructor(
        @InjectModel(Staff.name)
        private readonly staffModel: Model<StaffDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async login(req: LoginDto) {
        const staff = await this.staffModel.findOne({
            staffId: req.staffId,
            isDeleted: false
        }).exec();

        if (!staff) {
            throw new UnauthorizedException('Invalid staffId or password');
        }

        if (!staff.isActive) {
            throw new UnauthorizedException('Staff account is inactive');
        }

        const isPasswordValid = await bcrypt.compare(req.password, staff.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid staffId or password');
        }

        const { password, ...staffData } = staff.toObject();

        const payload = {
            staffId: staff.staffId,
            email: staff.email,
            role: staff.role,
            sub: staff._id
        };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '5m'
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: '24h'
        });

        return {
            message: 'Login successful',
            staff: staffData,
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
}
