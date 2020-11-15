import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from 'src/modules/auth/guards/local.guard';
import { AuthorizedUser } from 'src/interfaces/user.interface';
import { AuthService } from './auth.service';

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

    @Post('restore-token')
    async generateAccessToken(@Body('refresh_token') refresh_token: string): Promise<AuthorizedUser>{
        return await this.authService.restorToken(refresh_token);
    }
    
}
