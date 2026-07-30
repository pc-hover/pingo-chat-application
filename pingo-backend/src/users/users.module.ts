import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './entities/users.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { User, UserSchema } from './entities/users.entity';

@Module({
  imports: [DatabaseModule.forFeature(
    [
      { name: User.name, schema: UserSchema }
    ]
  )],
  providers: [UsersResolver, UsersService, UsersRepository],
})
export class UsersModule { }
