import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { StaffModule } from './staff/staff.module';
import { AuthServiceModule } from './auth-service/auth-service.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { ParentModule } from './parent/parent.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GradeModule } from './grade/grade.module';
import { FeeModule } from './fee/fee.module';

function setupOpenAPI(app) {
  const options = new DocumentBuilder()
    .setTitle('School Management Service')
    .setDescription('API definition for School Management Service')
    .setVersion('1.0')
    .addTag('Staff', 'Staff management endpoints')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Class', 'Class management endpoints')
    .addTag('Student', 'Student management endpoints')
    .addTag('Student Auth', 'Student authentication endpoints')
    .addTag('Parent', 'Parent management endpoints')
    .addTag('Parent Auth', 'Parent authentication endpoints')
    .addTag('Attendance', 'Attendance tracking endpoints')
    .addTag('Grade', 'Grade and exam management endpoints')
    .addTag('Fee', 'Fee management endpoints')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [
      StaffModule,
      AuthServiceModule,
      ClassModule,
      StudentModule,
      ParentModule,
      AttendanceModule,
      GradeModule,
      FeeModule,
    ],
  });
  SwaggerModule.setup('/v1/api-docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupOpenAPI(app);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
