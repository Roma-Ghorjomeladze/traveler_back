import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { UserDto } from './dto/user.dto';
import {hash, compare} from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { getConnection, IsNull } from 'typeorm';
import { UserInterface } from 'src/interfaces/user.interface';
import { ProfileRepository } from '../../repositories/profile.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        @InjectRepository(ProfileRepository) private profileRepository: ProfileRepository
    ){}

    async saveUser(userDto: UserDto){
        const duplicate = await this.findByUsername(userDto.username);
        if(duplicate){
            throw new HttpException('user with such username already exists', HttpStatus.CONFLICT)
        }
        userDto.password = await this.setPasswordHash(userDto.password);
        const user = await getConnection().transaction(async (entityManager) => {
            const user = await this.userRepository.saveUser(userDto, entityManager);
            const profile = await this.profileRepository.saveProfile(userDto, user.id, entityManager);
            user.profile = profile;
            return user;
        })
        return user;
    }

    async setPasswordHash(plainPassword: string): Promise<string>{
        return hash(plainPassword, 15);
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>{
        return compare(plainPassword, hashedPassword);
    }

    async findByUsername(username: string): Promise<UserEntity | undefined>{
        return await this.userRepository.findOne({where: {username, deleted_at: IsNull()}});
    }

    async findWithPassword(username: string): Promise<UserInterface>{
        return await this.userRepository.findByUsername(username);
    }

    async fetchProfiles(){
        return await this.profileRepository.find();
    }
}
