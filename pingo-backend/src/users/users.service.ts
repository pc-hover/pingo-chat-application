import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './entities/users.repository';
import * as bcrypt from "bcrypt"
@Injectable()
export class UsersService {
  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserInput: CreateUserInput) {
    try {
      return this.usersRepository.create({
        ...createUserInput,
        password: await this.hashPassword(createUserInput.password)

      })
    }
    catch (err: any) {
      if (err.message.includes('E11000')) {
        throw new UnprocessableEntityException("Email already exists")
      }
      throw err
    }
  }

  async findAll() {
    return this.usersRepository.find({});
  }

  async findOne(_id: string) {
    return this.usersRepository.findOne({ _id })
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      updateUserInput.password = await this.hashPassword(updateUserInput.password);
    }
    return this.usersRepository.findAndUpdate(
      { _id },
      {
        $set: {
          ...updateUserInput,

        },
      },
    );
  }

  async remove(_id: string) {
    return await this.usersRepository.findAndDelete({ _id });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Credentials are incorrect")
    }
    return user;
  }
}
