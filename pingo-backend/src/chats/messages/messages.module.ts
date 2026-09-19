import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatsRepository } from '../chats.repository';
import { ChatsModule } from '../chats.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [MessagesResolver, MessagesService],
  imports: [forwardRef(() => ChatsModule), UsersModule]
})
export class MessagesModule { }
