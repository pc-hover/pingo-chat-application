
//Schema 
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractRepository } from "src/common/database/abstract.repository";
import { AbstractEntity } from "src/common/database/abstract.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Schema({ versionKey: false })
@ObjectType()
export class User extends AbstractEntity {

    @Prop()
    @Field()
    email: string;

    @Prop()
    password: string

}

export const UserSchema = SchemaFactory.createForClass(User)
