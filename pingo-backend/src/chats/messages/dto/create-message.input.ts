import { InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Field } from "@nestjs/graphql";

@InputType()
export class CreateMessageInput {
    @Field()
    @IsNotEmpty()
    content: string

    @Field()
    @IsNotEmpty()
    chatId: string


}