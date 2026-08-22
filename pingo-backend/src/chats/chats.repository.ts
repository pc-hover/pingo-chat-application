import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/common/database/abstract.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChatsRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(ChatsRepository.name);

    constructor(@InjectModel(Chat.name) userModel: Model<Chat>) {

        super(userModel)
    }

}