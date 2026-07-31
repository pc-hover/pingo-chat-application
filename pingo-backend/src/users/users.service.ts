import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './entities/users.repository';
import * as bcrypt from "bcrypt"
@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) { }
  async create(createUserInput: CreateUserInput) {
    return this.usersRepository.create({
      ...createUserInput,
      password: await bcrypt.hash(createUserInput.password, 10)

    })
  }

  async findAll() {
    return this.usersRepository.find({});
  }

  async findOne(id: string) {
    return this.usersRepository.findOne({ _id: id })
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
