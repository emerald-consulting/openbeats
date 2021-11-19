import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from '../auth/auth.module';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from './message.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}