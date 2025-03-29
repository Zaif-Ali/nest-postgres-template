import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/SignUp.dto';
import { UserRole } from 'src/types/user.types';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/database/entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/SignIn.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signUp(signUpData: SignUpDto) {
    const userExists = await this.usersService.findByEmail(signUpData.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashData(signUpData.password);
    const newUser = await this.usersService.create({
      email: signUpData.email,
      name: signUpData.name,
      password: hashedPassword,
      role: signUpData.role,
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    await this.saveRefreshToken(
      newUser.id,
      tokens.refreshToken,
      tokens.tokenId,
    );
    return tokens;
  }

  async signIn(signInData: SignInDto) {
    const user = await this.usersService.findByEmail(signInData.email);
    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatches = await bcrypt.compare(
      signInData.password,
      user.password,
    );
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken, tokens.tokenId);
    return { tokens, user };
  }

  async logout(userId: string) {
    return this.refreshTokenRepository.delete({ user: { id: userId } });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new BadRequestException('User does not exist');
    const refreshTokenData = await this.refreshTokenRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!refreshTokenData)
      throw new BadRequestException('Refresh token is invalid');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      refreshTokenData.token,
    );
    if (!refreshTokenMatches)
      throw new BadRequestException('Refresh token is invalid');

    // Delete old refresh token
    await this.refreshTokenRepository.delete({
      tokenId: refreshTokenData.tokenId,
    });

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken, tokens.tokenId);
    return tokens;
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string,
    tokenId: string,
  ) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    const existingToken = await this.refreshTokenRepository.findOne({
      where: { user: { id: userId } },
    });

    if (existingToken) {
      existingToken.token = hashedRefreshToken;
      await this.refreshTokenRepository.save(existingToken);
    } else {
      await this.refreshTokenRepository.save({
        user: { id: userId },
        token: hashedRefreshToken,
        tokenId,
      });
    }
  }

  async getTokens(userId: string, email: string, role: UserRole) {
    const tokenId = uuidv4();
    const payload = { sub: userId, email, role, tokenId };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken, tokenId };
  }

  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
