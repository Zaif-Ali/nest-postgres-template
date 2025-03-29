import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name, { timestamp: true });

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  get() {
    return this.userRepository.find();
  }

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  create(userDTO: CreateUserDto) {
    const user = this.userRepository.create(userDTO);
    return this.userRepository.save(user);
  }
}
