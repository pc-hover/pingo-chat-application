import { Inject, Injectable } from '@nestjs/common';
import { ChatsRepository } from '../chats.repository';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';
import { GetMessagesArgs } from './dto/get-messages.args';
import { PubSub } from 'graphql-subscriptions';
import { MESSAGES } from '@nestjs/core/constants';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { PUB_SUB } from 'src/common/constants/injection-token';
import { MessageCreatedArgs } from './dto/message-created.args';
import { ChatsService } from '../chats.service';

@Injectable()
export class MessagesService {


    constructor(
        private readonly chatsRepository: ChatsRepository,
        @Inject(PUB_SUB) private readonly pubSub: PubSub,
        private readonly chatsService: ChatsService) { }

    async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
        const message: Message = {
            content,
            userId,
            createdAt: new Date(),
            _id: new Types.ObjectId(),
            chatId
        };
        await this.chatsRepository.findAndUpdate({
            _id: chatId,
            ...this.chatsService.userChatFilter(userId)

        }, {
            $push: {
                messages: message
            }
        })

        await this.pubSub.publish(MESSAGE_CREATED, {
            messageCreated: message,
        })
        return message
    }

    async getMessages({ chatId }: GetMessagesArgs, userId: string) {
        return (
            await this.chatsRepository.findOne({
                _id: chatId,
                ...this.chatsService.userChatFilter(userId)
            })
        ).messages
    }

    async messageCreated({ chatId }: MessageCreatedArgs, userId: string) {
        await this.chatsRepository.findOne({

            _id: chatId,
            ...this.chatsService.userChatFilter(userId)
        })
        return this.pubSub.asyncIterableIterator(MESSAGE_CREATED)
    }
}
