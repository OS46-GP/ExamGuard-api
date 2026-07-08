import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProctoringGateway } from './proctoring.gateway';
import { CoordinatorService } from './coordinator.service';
import { IntegrityEvent, IntegrityEventSchema } from './schemas/integrity-event.schema';
import { Rebuttal, RebuttalSchema } from './schemas/rebuttal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IntegrityEvent.name, schema: IntegrityEventSchema },
      { name: Rebuttal.name, schema: RebuttalSchema },
    ]),
  ],
  providers: [ProctoringGateway, CoordinatorService],
  exports: [CoordinatorService],
})
export class ProctoringModule {}
