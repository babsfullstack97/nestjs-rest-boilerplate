import { Module } from '@nestjs/common';

import {
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
    CacheModule,
    CacheInterceptor,
} from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from '@modules/users/users.module';
import { StatusModule } from '@modules/status/status.module';

import { AppController } from './app.controller';
import { RolesMiddleware } from '@infra/auth/roles.middleware';

import { REDIS_CACHE_OPTIONS } from '@infra/cache/redis/config.redis';
import { THROTTLER_CONFIG } from '@config/throttler.config';
import { typeormConfig } from '@infra/database/typeorm/typeorm.config';

import type { ClientOpts } from '@infra/cache/redis/config.redis';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig.getTypeOrmConfig()),
        CacheModule.register<ClientOpts>({
            store: redisStore,
            ...REDIS_CACHE_OPTIONS,
        }),
        ThrottlerModule.forRoot({
            ...THROTTLER_CONFIG,
        }),
        UsersModule,
        StatusModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RolesMiddleware)
            .exclude(
                { path: 'status', method: RequestMethod.GET },
                { path: '/', method: RequestMethod.GET },
            )
            .forRoutes('*');
    }
}
