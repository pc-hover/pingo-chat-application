import { User } from "src/users/entities/users.entity";

export type TokenPayload = Omit<User, '_id'> & { _id: string };
