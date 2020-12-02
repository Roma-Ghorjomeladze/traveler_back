import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import {
  AuthorizedUser,
  JwtPayload,
  UserInterface,
} from 'src/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<UserInterface | undefined> {
    const user = await this.userService.findWithPassword(loginDto.username);
    let match = undefined;
    if (user) {
      match = await this.userService.comparePassword(
        loginDto.password,
        user.password,
      );
    }
    return match ? user : undefined;
  }

  async login(user: UserInterface): Promise<AuthorizedUser> {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    delete user.password;
    return {
      access_token: 'Bearer ' + this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET,
      }),
      refresh_token: 'Bearer ' + this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
      user,
    };
  }

  async restoreToken(token: string): Promise<AuthorizedUser> {
    const payload: JwtPayload = await this.jwtService.verify(token, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
    if (!payload) {
      throw new UnauthorizedException();
    }
    const access_token: string = this.jwtService.sign(payload);
    return { access_token };
  }
}
