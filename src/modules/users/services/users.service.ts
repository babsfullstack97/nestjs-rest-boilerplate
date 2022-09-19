import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UsersSql } from '../sql/users.sql';

import { User } from '../entities/users.entity';

import authConfig from '../../../infra/auth/auth';

import type { UserListDataDto } from '../dto/users-list-data';
import type { UserSessionsDto } from '../dto/user-sessions.dto';
import type { CreateUserDto } from '../dto/create-user.dto';
import type { AuthResponseType } from '../types/users.type';
import { UserInterface } from '@modules/users/interfaces/users.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    public async findUserList(dto: UserListDataDto): Promise<User[]> {
        return await this.userRepository.query(
            UsersSql.findUserList({
                ...dto,
            }),
        );
    }

    public async create(createUserDto: CreateUserDto): Promise<UserInterface> {
        try {
            const passwordHash = await bcrypt.hash(createUserDto.password, 8);
            const user = this.userRepository.create({
                ...createUserDto,
                password: passwordHash,
            });
            return this.userRepository.save(user);
        } catch (error) {
            throw error;
        }
    }
    public async findAll(): Promise<UserInterface[]> {
        return await this.userRepository.find();
    }
    public async findOne(id: string): Promise<UserInterface> {
        return await this.userRepository.findOne({
            where: {
                id,
            }
        });
    }
    public async auth(
        userSessionsDto: UserSessionsDto,
    ): Promise<AuthResponseType> {
        const user = await this.userRepository.findOne({
            where: {
                email: userSessionsDto.email,
            },
        });

        return new Promise(async (resolve, reject) => {
            if (!user) {
                return reject(new NotFoundException('User not found'));
            }

            const passwordMatched = await bcrypt.compare(
                userSessionsDto.password,
                user.password,
            );

            if (!passwordMatched) {
                return reject(new UnauthorizedException('Invalid password!'));
            }

            const access_token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            return resolve({
                access_token,
                user,
            });
        });
    }
}
