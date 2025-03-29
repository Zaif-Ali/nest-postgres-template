import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class ActivityMiddleware implements NestMiddleware {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

   use(req: Request, res: Response, next: NextFunction) {
    // const userId = req.user?.userId; // Extract user from request
    // if (userId) {
    //   await this.userRepo.update(userId, { lastActiveAt: new Date() });
    // }
    next();
  }
}
