import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';

@ObjectType()
export class Chat extends AbstractEntity {
  //userId
  //isPrivate
  //Chats ids  []
  //Room id 
  // 

  @Field()
  name: string

  @Field(() => Message, { nullable: true })
  latestMessage?: Message;

}
