import { getRepositoryToken } from '@nestjs/typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { UserServiceMock } from './mock/users.service.mock';

import { User } from '../entities/users.entity';

describe('UserService', () => {
    let service: UsersService;

    const mockUserRepository = {
        query: jest.fn(),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CacheModule.register({})],
            providers: [
                {
                    provide: UsersService,
                    useClass: UserServiceMock,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    beforeEach(() => {
        mockUserRepository.query.mockReset();
    });

    describe('UsersService methods', () => {
        it('should must create a user', async () => {
            const expectedResult = {
                name: 'Joel Kennedy',
                email: 'pu@futri.et',
                avatar: null,
                id: '893ef2d8-344f-43c6-9a72-aeb378dc5a34',
                created_at: '2022-09-19T01:22:36.316Z',
                updated_at: '2022-09-19T01:22:36.316Z',
            };
            const result = await service.create({
                name: 'Joel Kennedy',
                email: 'pu@futri.et',
                password: '123456',
            });

            expect(result.name).toBe(expectedResult.name);
            expect(result.email).toBe(expectedResult.email);
        });
    });
});
