import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import setupDocumentation from './app.documentation';

async function bootstrap() {

  const opt: NestApplicationOptions = {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
      level: process.env.LOG_LEVEL,
    }),
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, opt);

  app.enableCors();
  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  setupDocumentation(app);

  const port = 6000;//config.serverPort;

  const logger = new Logger('NestApplication');

  await app.listen(port, () =>
    logger.log(`Server(${process.env.NODE_ENV}) initialized on port ${port}`),
  );
}

bootstrap();
