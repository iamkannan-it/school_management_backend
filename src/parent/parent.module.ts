import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ParentService } from './services/parent.service';
import { ParentAuthService } from './services/parent-auth.service';
import { ParentJwtStrategy } from './services/parent-jwt.strategy';
import { ParentController } from './controller/parent.controller';
import { ParentAuthController } from './controller/parent-auth.controller';
import { Parent, ParentSchema } from './schema/parent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }]),
    PassportModule,
    JwtModule.register({}),
    ConfigModule,
  ],
  controllers: [ParentController, ParentAuthController],
  providers: [ParentService, ParentAuthService, ParentJwtStrategy],
  exports: [ParentService, MongooseModule],
})
export class ParentModule {}
