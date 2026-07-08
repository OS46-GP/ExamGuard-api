import { Injectable } from '@nestjs/common';

@Injectable()
export class CoordinatorService {
  /**
   * Stub: calculates an integrity score for a proctoring session.
   * TODO
   */
  async calculateIntegrityScore(sessionId: string): Promise<number> {
    // TODO
    return 0.85;
  }
}
