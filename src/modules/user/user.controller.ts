import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({ summary: 'Create user'})
  @Post('create')
  async createUser(@Body() userDto: UserDto): Promise<UserEntity> {
    return await this.userService.saveUser(userDto);
  }

  @ApiOperation({ summary: 'Test api'})
  @Post('test')
  async test() {
    return await this.userService.fetchProfiles();
  }
}
