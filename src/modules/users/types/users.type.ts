import type { User } from '../entities/users.entity';

export type AuthResponseType = {
    access_token: string;
    user: User;
};
export type UserListSQLType = {
    limit: number;
};
