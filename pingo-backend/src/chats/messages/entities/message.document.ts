import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { AbstractEntity } from "src/common/database/abstract.entity";
import { Types } from "mongoose";

@Schema()
export class MessageDocument extends AbstractEntity {
    @Prop()//schema
    content: string

    @Prop()
    createdAt: Date

    @Prop()
    userId: Types.ObjectId;



}