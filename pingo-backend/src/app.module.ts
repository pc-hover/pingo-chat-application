import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { DatabaseModule } from './common/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { UsersModule } from './users/users.module';
import { LoggerModule } from "nestjs-pino"
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        // NODE_ENV: 'production'
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    DatabaseModule,
    UsersModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        return {
          pinoHttp: {
            transport: isProduction ? undefined : {
              target: "pino-pretty",
              options: {
                singleLine: true
              },
            },
            level: isProduction ? 'info' : 'debug'
          },
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
