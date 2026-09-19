import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';
import { MessageDocument } from '../messages/entities/message.document';

@Schema()
export class ChatDocument extends AbstractEntity {
    //userId
    //isPrivate
    //Chats ids  []
    //Room id 
    // 


    @Prop()
    userId: string

    @Prop()
    name: string

    @Prop([MessageDocument])
    messages: MessageDocument[];

}

export const ChatSchema = SchemaFactory.createForClass(ChatDocument)