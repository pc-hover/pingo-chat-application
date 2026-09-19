import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { AbstractEntity } from "src/common/database/abstract.entity";
import { User } from "src/users/entities/users.entity";

@ObjectType()
export class Message extends AbstractEntity {
    @Field()//graphql
    content: string

    @Field()
    createdAt: Date

    @Field(() => User)
    user: User;

    @Field()
    chatId: string


}