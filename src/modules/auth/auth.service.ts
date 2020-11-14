import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async validateUser(loginDto: LoginDto){
        const user = await this.userService.findByUsername(loginDto.username)
        let match = undefined;
        if(user){
            match = await this.userService.comparePassword(loginDto.password, user.password);
        }
        return match ? user : undefined;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        delete user.password;
        return {
          access_token: this.jwtService.sign(payload),
          user,
        };
      }
}
