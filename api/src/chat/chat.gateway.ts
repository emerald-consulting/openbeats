import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    await this.chatService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(@MessageBody() content: string, @ConnectedSocket() socket: Socket) {
    const author = await this.chatService.getUserFromSocket(socket);
    this.server.sockets.emit('receive_mesage', { content, author });
  }

  @SubscribeMessage('request_all_messages')
  async requestAllMessages(
    @ConnectedSocket() socket: Socket,
  ) {
    await this.chatService.getUserFromSocket(socket);
    const messages = await this.chatService.getAllMessages();
 
    socket.emit('send_all_messages', messages);
  }
}
