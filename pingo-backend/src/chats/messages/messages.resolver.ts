import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUser } from 'src/auth/current-user.decorater';
import { Mutation, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { GetMessagesArgs } from './dto/get-messages.args';
import { PUB_SUB } from 'src/common/constants/injection-token';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { MessageCreatedArgs } from './dto/message-created.args';


@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService, @Inject(PUB_SUB) private readonly pubSub: PubSub) { }


  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput
    ,
    @CurrentUser() user: TokenPayload
  ) {
    return this.messagesService.createMessage(createMessageInput, user._id)
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(@Args() getMessageArgs: GetMessagesArgs, @CurrentUser() user: TokenPayload) {
    return this.messagesService.getMessages(getMessageArgs, user._id);

  }

  @Subscription(() => Message, {
    filter: (payload, variables) => {
      return payload.message.chatId === variables.chatId
    }
  })
  messageCreated(@Args() messageCreatedArgs: MessageCreatedArgs) {
    return this.pubSub.asyncIterableIterator(MESSAGE_CREATED)
  }



}
