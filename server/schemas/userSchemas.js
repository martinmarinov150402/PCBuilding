"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistrationSchema = void 0;
const zod_1 = require("zod");
exports.userRegistrationSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(8),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
