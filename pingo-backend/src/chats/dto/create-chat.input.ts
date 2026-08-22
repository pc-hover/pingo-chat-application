import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator"
import { Transform } from 'class-transformer';
@InputType()
export class CreateChatInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string

  @Field()
  @IsBoolean()
  @Transform(({ value }) => value === "true")
  isPrivate: boolean

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()

  userIds?: string[]

}

