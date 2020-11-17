import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileRepository } from '../../repositories/profile.repository';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([
    UserRepository,
    ProfileRepository,
  ])],
  exports: [UserService]
})
export class UserModule {}
