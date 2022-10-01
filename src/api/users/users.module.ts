import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { User } from './entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // imports: [Repository<User>],
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
