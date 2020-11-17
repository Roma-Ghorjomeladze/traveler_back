import { UserEntity } from "src/entities/user.entity";
import { UserDto } from "src/modules/user/dto/user.dto";
import { EntityManager, EntityRepository, IsNull } from 'typeorm';
import { BaseRepository } from "./base.repository";

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    
    async saveUser(dto: UserDto, entityManager: EntityManager): Promise<UserEntity>{
        const user = new UserEntity();
        user.username = dto.username;
        user.password = dto.password;
        return await entityManager.getRepository(UserEntity).save(user);
    }

    async isUsernameValid(username: string): Promise<boolean>{
        const duplicate = await this.findOne({where: {username, deleted_at: IsNull()}});
        if(duplicate){
            return false;
        }
        return true;
    }

    async findByUsername(username: string): Promise<any>{
        const qb = this.createQueryBuilder('u');
        qb.where('u.username = :username', {username})
        qb.select([
            'u.username as username',
            'u.password as password',
            'u.id as id',
        ])
        return await qb.getRawOne();
    }
}
