import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    @Post('create')
    async createUser(@Body() userDto: UserDto): Promise<UserEntity>{
       return await this.userService.saveUser(userDto);
    }

    @Post('test')
    async test(){
        return {working: true}
    }
}
