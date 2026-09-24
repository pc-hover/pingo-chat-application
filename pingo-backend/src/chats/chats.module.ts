import { forwardRef, Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { Chat } from './entities/chat.entity';
import { DatabaseModule } from 'src/common/database/database.module';
import { ChatsRepository } from './chats.repository';
import { MessagesModule } from './messages/messages.module';
import { ChatSchema } from './entities/chat.document';
import { ChatsController } from './chats.controller';
@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    forwardRef(() => MessagesModule),
  ],
  providers: [ChatsResolver, ChatsService, ChatsRepository],
  exports: [ChatsRepository],
  controllers: [ChatsController]

})
export class ChatsModule { }
