import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';

@Entity({ name: 'agent' })
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  os: string; // Example: Windows, macOS, iOS, Android

  @Column()
  browser: string; // Example: Chrome, Safari, Edge

  @Column({ nullable: true })
  deviceType?: string; // Example: Mobile, Tablet, Desktop

  @Column({ nullable: true })
  ipAddress?: string;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.agent, { onDelete: 'CASCADE' })
  refreshToken: RefreshToken;
}
