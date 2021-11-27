import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.use(cookieParser());
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Open Beats API')
    .setDescription('The Open Beats social media API ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
