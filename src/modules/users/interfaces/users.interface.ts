import { User } from '@modules/users/entities/users.entity';

export class UserInterface implements User {
    created_at: Date;
    email: string;
    id: string;
    name: string;
    password: string;
    updated_at: Date;
}
