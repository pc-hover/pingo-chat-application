import { Module, UnauthorizedException } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { PubSubModule } from './common/pubsub/pubsub.module';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { Logger } from '@nestjs/common';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        // NODE_ENV: 'production'
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (authService: AuthService) => ({
        autoSchemaFile: true,
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: any) => {
              try {
                const request: Request = context.extra.request;
                const user = authService.verifyWs(request)
                context.user = user;

              } catch (err) {
                new Logger().error(err);
                console.log("Error from App Module", err)
                throw new UnauthorizedException()
              }
            }
          }
        }
      }),
      imports: [AuthModule],
      inject: [AuthService]

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
    }),
    AuthModule,
    ChatsModule,
    PubSubModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


// subscriptions: {
//       'graphql-ws': true
//     }