import { UserEntity } from "src/entities/user.entity";
import { UserDto } from "src/modules/user/dto/user.dto";
import { EntityManager, EntityRepository, IsNull } from 'typeorm';
import { BaseRepository } from "./base.repository";
import { ProfileEntity } from '../entities/profile.entity';

@EntityRepository(ProfileEntity)
export class ProfileRepository extends BaseRepository<ProfileEntity> {

  async saveProfile(dto: UserDto, user_id: number, entityManager: EntityManager): Promise<ProfileEntity>{
    const profile = new ProfileEntity();
    profile.birth_date = dto.birth_date;
    profile.firstname = dto.firstname;
    profile.lastname = dto.lastname;
    profile.user_id = user_id;
    return await entityManager.getRepository(ProfileEntity).save(profile);
  }
}
