import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatsRepository } from '../chats.repository';
import { ChatsModule } from '../chats.module';

@Module({
  providers: [MessagesResolver, MessagesService],
  imports: [forwardRef(() => ChatsModule)]
})
export class MessagesModule { }
