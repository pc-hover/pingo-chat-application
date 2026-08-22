import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@ObjectType()
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
  isPrivate: string

  @Field(() => [String])
  @Prop([String])
  userIds: string[]

  @Field()
  @Prop()
  name?: string
}
