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
import { MessageDocument } from './entities/message.document';
import { UsersService } from 'src/users/users.service';
import { ObjectType } from '@nestjs/graphql';

@Injectable()
export class MessagesService {


    constructor(
        private readonly chatsRepository: ChatsRepository,
        @Inject(PUB_SUB) private readonly pubSub: PubSub,
        private readonly userService: UsersService

    ) { }

    async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
        const messageDocument: MessageDocument = {
            content,
            userId: new Types.ObjectId(userId),
            createdAt: new Date(),
            _id: new Types.ObjectId()
        };
        await this.chatsRepository.findAndUpdate({
            _id: chatId,

        }, {
            $push: {
                messages: messageDocument
            }
        })

        const message: Message = {
            ...messageDocument,
            chatId,
            user: await this.userService.findOne(userId)
        }
        await this.pubSub.publish(MESSAGE_CREATED, {
            messageCreated: message,
        })
        return message
    }

    async getMessages({ chatId, skip, limit }: GetMessagesArgs) {
        return this.chatsRepository.model.aggregate(
            [
                {
                    $match: { _id: new Types.ObjectId(chatId) }
                },
                { $unwind: '$messages' },
                { $replaceRoot: { newRoot: '$messages' } },
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' },
                { $unset: 'userId' },
                { $set: { chatId } },
            ]
        )
    }

    async messageCreated() {
        return this.pubSub.asyncIterableIterator(MESSAGE_CREATED)
    }

    async countMessages(chatId: string) {
        return (await this.chatsRepository.model.aggregate([
            { $match: { _id: new Types.ObjectId(chatId) } },
            { $unwind: "$messages" },
            { $count: "messages" }
        ]))[0]

    }
}
