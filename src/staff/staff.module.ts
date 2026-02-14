import { Module } from '@nestjs/common';
import { StaffController } from './controller/staff.controller';
import { StaffService } from './services/staff.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './schema/staff.schema';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([
      {name: Staff.name, schema: StaffSchema},
    ])
  ],
  controllers: [StaffController],
  providers: [StaffService, JwtStrategy,]
})
export class StaffModule {}
