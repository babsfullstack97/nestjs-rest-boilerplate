import crypto from 'node:crypto';

import { User } from '@modules/users/entities/users.entity';

import { chance } from '../../../../shared/mocks/chance';

import type { UserListDataDto } from '../../../../modules/users/dto/users-list-data';
import type { UserSessionsDto } from '../../../../modules/users/dto/user-sessions.dto';
import type { AuthResponseType } from '../../../../modules/users/types/users.type';
import type { CreateUserDto } from '../../../../modules/users/dto/create-user.dto';

export class UserServiceMock {
    private users: Map<string, User> = new Map<string, User>();
    public constructor() {
        for (let i = 0; i < 10; i++) {
            let uuid = '';
            if (i === 1) {
                uuid = '893ef2d8-344f-43c6-9a72-aeb378dc5a34';
            } else {
                uuid = crypto.randomUUID();
            }

            this.users.set(uuid, {
                name: chance.name().split(' ')[0],
                created_at: undefined,
                email: chance.email(),
                id: uuid,
                password: '123456',
                updated_at: new Date(),
            });
        }
    }
    public async auth(
        userSessionsDto: UserSessionsDto,
    ): Promise<AuthResponseType> {
        void userSessionsDto;
        return Promise.resolve({
            access_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjM2ZkYzhkLWIyZjQtNGNjYi05ZGUyLWJjNTU0YWE4MmFlNiIsImlhdCI6MTY2MzUzOTc2MCwiZXhwIjoxNjYzNjI2MTYwfQ.jxpbRg10zxy60zhjH_lAWYgxHrXg8yu9Xu2H8-AFM7w',
            user: this.users.get('893ef2d8-344f-43c6-9a72-aeb378dc5a34'),
        });
    }

    public async create(createUserDto: CreateUserDto): Promise<User> {
        const data = {
            id: '893ef2d8-344f-43c6-9a72-aeb378dc5a34',
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            created_at: new Date(),
            updated_at: new Date(),
        };
        this.users.set(data.id, data);
        return Promise.resolve(data);
    }

    public async findAll(): Promise<User[]> {
        const user_list = [];
        this.users.forEach((user) => {
            user_list.push(user);
        });
        return Promise.resolve(user_list);
    }

    public async findOne(id: string): Promise<User> {
        return Promise.resolve(this.users.get(id));
    }

    public async findUserList(dto: UserListDataDto): Promise<User[]> {
        const user_list = await this.findAll();
        user_list.length = dto.limit;
        return user_list;
    }
}
export default new UserServiceMock();
