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
  const origins = configService
    .getOrThrow<string>('FRONTEND_URL')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''));

  app.enableCors({
    origin: origins,
    credentials: true,
  });
  await app.listen(configService.get('PORT'));
  console.log(`App is running at ${configService.getOrThrow('PORT')}`)
}
bootstrap();

