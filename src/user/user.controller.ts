import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserEntity } from '../database/entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() UserEntity: UserEntity): Promise<UserEntity> {
    return this.userService.create(UserEntity);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() UserEntity: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.update(id, UserEntity);
  }

  @Delete('/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
