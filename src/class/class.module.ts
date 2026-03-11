import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassService } from './services/class.service';
import { ClassController } from './controller/class.controller';
import { Class, ClassSchema } from './schema/class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService, MongooseModule],
})
export class ClassModule {}
