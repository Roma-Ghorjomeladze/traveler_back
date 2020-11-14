import { UserEntity } from "src/entities/user.entity";
import { UserDto } from "src/modules/user/dto/user.dto";
import { EntityRepository, IsNull } from "typeorm";
import { BaseRepository } from "./base.repository";

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    
    async saveUser(dto: UserDto): Promise<UserEntity>{
        const user = new UserEntity();
        user.username = dto.username;
        user.password = dto.password;
        return await this.save(user);
    }

    async isUsernameValid(username: string): Promise<boolean>{
        const duplicate = await this.findOne({where: {username, deleted_at: IsNull()}});
        if(duplicate){
            return false;
        }
        return true;
    }
}