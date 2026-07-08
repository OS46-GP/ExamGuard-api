import { Module } from '@nestjs/common';
import { ProctoringGateway } from './proctoring.gateway';
import { CoordinatorService } from './coordinator.service';

@Module({
  providers: [ProctoringGateway, CoordinatorService],
  exports: [CoordinatorService],
})
export class ProctoringModule {}
