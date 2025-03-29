import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { RedisCacheService } from 'src/shared/services/redis-cache.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/types/user.types';
import { getUserByEmailDto } from './dto/get-users';

@Controller('users')
export class UsersController {
  // inject the users service
  constructor(
    private readonly usersService: UsersService,
    private readonly cacheService: RedisCacheService,
  ) {}
  // Get single user by id
  @Get('/:id')
  @HttpCode(200)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.admin, UserRole.consumer)
  async getById(@Param('id') id: string) {
    console.log('getById called');
    let user = await this.cacheService.get(`user-${id}`);
    if (user) return console.log('returning from cache'), user;
    console.log(id);
    try {
      user = await this.usersService.findById(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid user id');
    }
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    await this.cacheService.set(`user-${id}`, user);
    return { user: user, paramId: id };
  }

  // Get single user by email
  @Get('/')
  @HttpCode(200)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.admin, UserRole.vendor)
  async getByEmail(@Query() queryData: getUserByEmailDto) {
    let user = await this.cacheService.get(`user-${queryData.email}`);
    if (user) return user;
    user = await this.usersService.findByEmail(queryData.email);
    if (!user)
      throw new NotFoundException(
        `User with Email: ${queryData.email} not found`,
      );
    await this.cacheService.set(`user-${queryData.email}`, user);
    return { user: user, givenEmail: queryData.email };
  }

  // Create a new user
  @Post('/create-user')
  @HttpCode(201)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.admin)
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(CreateUserDto.email);
    if (user) throw new BadRequestException('Email already exists');
    return this.usersService.create(CreateUserDto);
  }
}
