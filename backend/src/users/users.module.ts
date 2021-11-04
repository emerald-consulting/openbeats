import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { UsersController } from './users.controller';
import User from './entities/user.entity';
import Address from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address]), FilesModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
