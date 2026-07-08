import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/proctoring',
})
export class ProctoringGateway {
  private readonly logger = new Logger(ProctoringGateway.name);

  @SubscribeMessage('proctoring-event')
  handleEvent(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): any {
    this.logger.log(`Event from ${client.id}: ${JSON.stringify(data)}`);
    // TODO
    return { event: 'proctoring-event-ack', data: { received: true, original: data } };
  }
}
