import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatusEnum, UserTypeEnum } from '../enums/user.enums';
import { ProfileEntity } from './profile.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserTypeEnum, default: UserTypeEnum.TRAVELER })
  type: UserTypeEnum;

  @Column({ type: 'enum', enum: UserStatusEnum, default: UserStatusEnum.WAITING })
  status: UserTypeEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: number;

  @OneToOne(() => ProfileEntity, profile => profile.user)
  profile: ProfileEntity;
}
