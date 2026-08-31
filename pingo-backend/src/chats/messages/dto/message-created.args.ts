import { IsNotEmpty } from "class-validator";
import { ArgsType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
@ArgsType()
export class MessageCreatedArgs {
    @Field()
    @IsNotEmpty()
    chatId: string

}