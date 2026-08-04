import type { AbstractModel } from "./AbstractModel";

export interface User extends AbstractModel {
    email: string;
    password: string;
}