import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { StaffModule } from './staff/staff.module';
import { AuthServiceModule } from './auth-service/auth-service.module';

function setupOpenAPI(app) {
  const options = new DocumentBuilder()
    .setTitle('School Management Service')
    .setDescription('API definition for School Management Service')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [StaffModule, AuthServiceModule],
  });
  SwaggerModule.setup('/v1/staff/api-docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupOpenAPI(app);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
