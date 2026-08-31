import { Injectable } from '@nestjs/common';
import { ChatsRepository } from '../chats.repository';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';
import { GetMessagesArgs } from './dto/get-messages.args';

@Injectable()
export class MessagesService {

    private userChatFilter(userId: string) {
        return ({
            $or: [
                { userId },
                {
                    userIds: {

                        $in: [userId]
                    }
                }
            ]

        })
    }
    constructor(private readonly chatsRepository: ChatsRepository) { }

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
            ...this.userChatFilter(userId)

        }, {
            $push: {
                messages: message
            }
        })
        return message
    }

    async getMessages({ chatId }: GetMessagesArgs, userId: string) {
        return (
            await this.chatsRepository.findOne({
                _id: chatId,
                ...this.userChatFilter(userId)
            })
        ).messages
    }

}
