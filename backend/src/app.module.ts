import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { APP_FILTER } from '@nestjs/core';
import { FindOneParams } from './utils/exceptionsLogger.filter';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    PostsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FindOneParams,
    },
  ],
})
export class AppModule {}
