import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Agent } from './agent.entity';

@Entity({ comment: 'RefreshToken' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  token: string;

  @Column({ nullable: true })
  tokenId: string;

  @OneToOne(() => Agent, (agent) => agent.refreshToken, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  agent: Agent;

  @ManyToOne(() => User, (user) => user.rt, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
