import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator"
import { Transform } from 'class-transformer';
@InputType()
export class CreateChatInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string

}

