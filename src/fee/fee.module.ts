import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeeService } from './services/fee.service';
import { FeeController } from './controller/fee.controller';
import { Fee, FeeSchema } from './schema/fee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fee.name, schema: FeeSchema }]),
  ],
  controllers: [FeeController],
  providers: [FeeService],
  exports: [FeeService, MongooseModule],
})
export class FeeModule {}
