import { ArgsType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Field } from "@nestjs/graphql";
import { PaginationArgs } from "src/common/dto/pagination-args.dto";
@ArgsType()
export class GetMessagesArgs extends PaginationArgs {

    @Field()
    @IsNotEmpty()
    chatId: string
}