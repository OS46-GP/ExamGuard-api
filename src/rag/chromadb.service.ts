import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChromaDbService {
  private readonly logger = new Logger(ChromaDbService.name);
  private connected = false;

  constructor(private configService: ConfigService) {}

  /**
   * Stub: connects to the ChromaDB instance.
   * TODO
   */
  async connect(): Promise<void> {
    const host = this.configService.get<string>('CHROMA_HOST');
    const port = this.configService.get<string>('CHROMA_PORT');
    this.logger.log(`Connecting to ChromaDB at ${host}:${port}...`);
    // TODO
    this.connected = true;
  }

  get isConnected(): boolean {
    return this.connected;
  }
}
