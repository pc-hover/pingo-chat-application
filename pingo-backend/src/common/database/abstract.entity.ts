import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Schema, Prop } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@ObjectType({ isAbstract: true })
export class AbstractEntity {
    @Prop({ type: SchemaTypes.ObjectId })
    @Field(() => ID)
    _id: Types.ObjectId;
}