import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({
    origin: configService.getOrThrow("FRONTEND_URL"), // your frontend URL
    credentials: true, // only needed if you're sending cookies/auth headers
  });
  await app.listen(configService.get('PORT'));
  console.log(`App is running at ${configService.getOrThrow('PORT')}`)
}
bootstrap();

