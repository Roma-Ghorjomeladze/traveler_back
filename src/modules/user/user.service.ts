import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { UserDto } from './dto/user.dto';
import {hash, compare} from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { IsNull } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository
    ){}

    async saveUser(userDto: UserDto){
        userDto.password = await this.setPasswordHash(userDto.password);
        return await this.userRepository.saveUser(userDto);
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
}
