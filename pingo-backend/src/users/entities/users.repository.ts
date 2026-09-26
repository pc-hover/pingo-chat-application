import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/common/database/abstract.repository";
import { UserSchema } from "./user.document";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./users.entity";
import { UserDocument } from "./user.document";
@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
    protected readonly logger = new Logger(UsersRepository.name);

    constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {

        super(userModel)
    }

}