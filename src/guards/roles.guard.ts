import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from 'src/types/user.types';
import { Request } from 'express';
import JwtPayload from 'src/modules/auth/types/JwtPayload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('Required roles: ', requiredRoles);
    if (!requiredRoles) return true; // No roles required, allow access

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;
    console.log('User: ', user);
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    console.log('User role: ', user.role);
    console.log('Required roles: ', requiredRoles);
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
