import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { AuthorizedUser } from 'src/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginUser(@Request() req){
        return await this.authService.login(req.user);
    }
}
