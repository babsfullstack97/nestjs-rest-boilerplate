import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { UserServiceMock } from '@modules/users/tests/mock/users.service.mock';

import { User } from './entities/users.entity';

import { configService } from '@config/application.config';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        {
            provide: UsersService,
            useClass: configService.isProduction()
                ? UsersService
                : UserServiceMock,
        },
    ],
})
export class UsersModule {}
