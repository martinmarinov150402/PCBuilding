var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from "./models/UserModel";
import 'dotenv/config';
import bodyParser from 'body-parser';
const express = require('express');
const app = express();
const port = 3000;
const { Model } = require('objection');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DBNAME,
    },
    searchPath: ['knex', 'public'],
});
Model.knex(knex);
app.use(bodyParser.json());
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield UserModel.query().select();
    yield res.send(result);
    console.log("giving users");
}));
app.post('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield UserModel.query().insert();
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
