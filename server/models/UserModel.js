"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserRole = void 0;
const BaseModel_1 = require("./BaseModel");
var UserRole;
(function (UserRole) {
    UserRole["User"] = "User";
    UserRole["Expert"] = "Expert";
    UserRole["Admin"] = "Admin";
})(UserRole || (exports.UserRole = UserRole = {}));
class UserModel extends BaseModel_1.BaseModel {
}
exports.UserModel = UserModel;
UserModel.tableName = "users";
