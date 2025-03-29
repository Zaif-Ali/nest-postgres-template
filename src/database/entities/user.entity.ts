import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { UserRole } from 'src/types/user.types';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.consumer,
  })
  role: UserRole;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  rt: RefreshToken[];

  @UpdateDateColumn({ type: 'timestamp' })
  lastActivityAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
