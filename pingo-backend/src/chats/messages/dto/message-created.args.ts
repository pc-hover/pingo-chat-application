import { IsArray, IsNotEmpty } from "class-validator";
import { ArgsType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
@ArgsType()
export class MessageCreatedArgs {
    @Field(() => [String])
    @IsArray()
    @IsNotEmpty({ each: true })
    chatIds: string[]

}