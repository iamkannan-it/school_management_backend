import { Module } from '@nestjs/common';
import { AuthServiceController } from './controller/auth-service.controller';
import { AuthServiceService } from './services/auth-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from '../staff/schema/staff.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([
      { name: Staff.name, schema: StaffSchema },
    ])
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService]
})
export class AuthServiceModule {}
