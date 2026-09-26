
//Schema 
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractRepository } from "src/common/database/abstract.repository";
import { AbstractEntity } from "src/common/database/abstract.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Schema({ versionKey: false })
export class UserDocument extends AbstractEntity {

    @Prop()
    email: string;

    @Prop()

    username: string;

    @Prop()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(UserDocument)
