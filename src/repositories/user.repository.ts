import { UserEntity } from "src/entities/user.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(UserEntity)
export class UserRepository {
    async saveUser(){
        const user = new UserEntity();
        user.username = 'roma';
        user.password = 'pass';
        return await user.save();
    }
}