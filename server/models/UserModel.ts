import { BaseModel } from "./BaseModel";

export enum UserRole {
    User = "User",
    Expert = "Expert",
    Admin = "Admin",
}
export class UserModel extends BaseModel {
    static readonly tableName = "users";

    username!: string
    passHash!: string
    role!: UserRole
    firstName!: string
    lastName!: string

}