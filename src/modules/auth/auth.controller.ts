import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from 'src/modules/auth/guards/local.guard';
import { AuthorizedUser } from 'src/interfaces/user.interface';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({summary: 'Login'})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req, @Body() dto: LoginDto) {
    return await this.authService.login(req.user);
  }

  @ApiOperation({summary: 'restore token'})
  @Post('restore-token')
  async generateAccessToken(
    @Body('refresh_token') refresh_token: string,
  ): Promise<AuthorizedUser> {
    return await this.authService.restoreToken(refresh_token);
  }
}
