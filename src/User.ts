export enum UserRole {
    User = "User",
    Expert = "Expert",
    Admin = "Admin",
}
export type User = {
    id: number,
    username: string
    passHash: string
    role: UserRole
    firstName: string
    lastName: string

}