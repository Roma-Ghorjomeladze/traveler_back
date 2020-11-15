import { UserEntity } from "src/entities/user.entity";

export interface AuthorizedUser {
    user?: UserInterface,
    access_token: string,
    refresh_token?: string;
}

export interface JwtPayload {
    username: string,
    sub: number,
}

export interface UserInterface {
    id: number,
    username: string,
    password?: string,
    created_at?: Date,
    updated_at?: Date,
}