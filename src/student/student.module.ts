import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { StudentService } from './services/student.service';
import { StudentAuthService } from './services/student-auth.service';
import { StudentJwtStrategy } from './services/student-jwt.strategy';
import { StudentController } from './controller/student.controller';
import { StudentAuthController } from './controller/student-auth.controller';
import { Student, StudentSchema } from './schema/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    PassportModule,
    JwtModule.register({}),
    ConfigModule,
  ],
  controllers: [StudentController, StudentAuthController],
  providers: [StudentService, StudentAuthService, StudentJwtStrategy],
  exports: [StudentService, MongooseModule],
})
export class StudentModule {}
