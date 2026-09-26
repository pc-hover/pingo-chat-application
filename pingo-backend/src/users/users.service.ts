import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './entities/users.repository';
import * as bcrypt from "bcrypt"
import { S3Service } from 'src/common/s3/s3.service';
import { USERS_BUCKET, USERS_IMAGE_FILE_EXTENSION } from './users.constants';
import { UserDocument } from './entities/user.document';
import { User } from './entities/users.entity';
@Injectable()
export class UsersService {
  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  constructor(private readonly usersRepository: UsersRepository,
    private readonly s3Service: S3Service

  ) { }

  async create(createUserInput: CreateUserInput) {
    try {
      return this.toEntity(await this.usersRepository.create({
        ...createUserInput,
        password: await this.hashPassword(createUserInput.password)

      }))
    }
    catch (err: any) {
      if (err.message.includes('E11000')) {
        throw new UnprocessableEntityException("Email already exists")
      }
      throw err
    }
  }

  async findAll() {
    return (await (this.usersRepository.find({}))).map((userDocument) => this.toEntity(userDocument))
  }

  async findOne(_id: string) {
    return this.toEntity(await this.usersRepository.findOne({ _id }))
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      updateUserInput.password = await this.hashPassword(updateUserInput.password);
    }
    return this.toEntity(await this.usersRepository.findAndUpdate(
      { _id },
      {
        $set: {
          ...updateUserInput,

        },
      },
    ))
  }

  async remove(_id: string) {
    return this.toEntity(await this.usersRepository.findAndDelete({ _id }));
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Credentials are incorrect")
    }
    return this.toEntity(user);
  }

  async uplaodImage(file: Buffer, userId: string) {
    await this.s3Service.upload({
      bucket: USERS_BUCKET,
      key: this.getUserImage(userId),
      file
    })
  }

  toEntity(userDocument: UserDocument): User {
    const user = {
      ...userDocument,
      imageUrl: this.s3Service.getObjectUrl(
        USERS_BUCKET,
        this.getUserImage(userDocument._id.toHexString())
      )
    }
    delete (user.password)
    return user
  }

  private getUserImage(userId: string) {
    return `${userId}.${USERS_IMAGE_FILE_EXTENSION}`
  }
}
