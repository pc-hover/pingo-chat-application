import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';

@ObjectType()
@Schema()
export class Chat extends AbstractEntity {
  //userId
  //isPrivate
  //Chats ids  []
  //Room id 
  // 

  @Field()
  @Prop()
  userId: string

  @Field()
  @Prop()
  isPrivate: boolean

  @Field(() => [String])
  @Prop([String])
  userIds: string[]

  @Field({ nullable: true })
  @Prop()
  name?: string

  @Prop([Message])
  messages: Message[];

}

export const ChatSchema = SchemaFactory.createForClass(Chat)