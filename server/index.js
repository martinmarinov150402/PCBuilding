"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("./models/UserModel");
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const validationMiddleware_1 = require("./middleware/validationMiddleware");
const userSchemas_1 = require("./schemas/userSchemas");
const express = require('express');
const app = express();
const port = 3000;
const { createHash } = require('crypto');
const { Model } = require('objection');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DBNAME,
    },
    searchPath: ['knex', 'public'],
});
Model.knex(knex);
app.use(body_parser_1.default.json());
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield UserModel_1.UserModel.query().select();
    yield res.send(result);
    console.log("giving users");
}));
app.post('/api/users', (0, validationMiddleware_1.validateData)(userSchemas_1.userRegistrationSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new UserModel_1.UserModel();
    newUser.username = req.body.username;
    newUser.passHash = createHash("sha256").update(req.body.password).digest("hex");
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    yield UserModel_1.UserModel.query().insert(newUser);
    res.send("KUR");
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
