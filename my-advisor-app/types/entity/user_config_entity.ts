import { UserRoleEnum } from '../enums';

export class UserConfigEntity {
    user_id: number;
    email: string;
    password_hash: string;
    role: UserRoleEnum;
    created_at: Date;
    updated_at: Date;

    constructor(
        user_id: number,
        email: string,
        password_hash: string,
        role: UserRoleEnum,
        created_at: Date,
        updated_at: Date
    ) {
        this.user_id = user_id;
        this.email = email;
        this.password_hash = password_hash;
        this.role = role;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}