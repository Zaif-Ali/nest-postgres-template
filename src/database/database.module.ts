import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { SharedModule } from 'src/shared/shared.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => {
        console.log(path.join(__dirname, `./entities/*.entity{.ts,.js}`));
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          logging: configService.get('POSTGRES_LOGS'),
          synchronize: false,
          entities: [
            path.join(__dirname, `./entities/*.entity{.ts,.js}`),
            path.join(__dirname, `./entities/*.view-entity{.ts,.js}`),
          ],
          migrations: [path.join(__dirname, `./migrations/*{.ts,.js}`)],
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
