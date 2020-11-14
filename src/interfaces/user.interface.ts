import { UserEntity } from "src/entities/user.entity";

export interface AuthorizedUser {
    user: UserEntity,
    token: string,
    refreshToken?: string;
}