import { Module } from '@nestjs/common';
import { RagController } from './rag.controller';
import { ChromaDbService } from './chromadb.service';

@Module({
  controllers: [RagController],
  providers: [ChromaDbService],
  exports: [ChromaDbService],
})
export class RagModule {}
