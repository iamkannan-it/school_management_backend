import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeService } from './services/grade.service';
import { GradeController } from './controller/grade.controller';
import { Grade, GradeSchema } from './schema/grade.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema }]),
  ],
  controllers: [GradeController],
  providers: [GradeService],
  exports: [GradeService, MongooseModule],
})
export class GradeModule {}
