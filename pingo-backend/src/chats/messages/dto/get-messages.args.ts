import { ArgsType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Field } from "@nestjs/graphql";
@ArgsType()
export class GetMessagesArgs {

    @Field()
    @IsNotEmpty()
    chatId: string
}