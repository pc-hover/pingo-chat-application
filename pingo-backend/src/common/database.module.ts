import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get("MONGODB_URI")
            }),
            inject: [ConfigService]
        }),
    ],
})
export class DatabaseModule { }