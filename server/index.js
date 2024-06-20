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
const validationMiddleware_1 = require("./middleware/validationMiddleware");
const userSchemas_1 = require("./schemas/userSchemas");
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(payload);
        //const user = await UserModel.query().findById(payload.user.id);
        if (payload.user)
            return done(null, payload.user);
    }
    catch (error) {
        return done(error);
    }
})));
const express = require('express');
const app = express();
const port = 3000;
const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');
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
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require('cors');
app.use(cors());
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
    res.send(newUser);
}));
app.patch('/api/users/:user', passport_1.default.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    yield UserModel_1.UserModel.query().findById(req.user).patch(req.body);
    res.send(yield UserModel_1.UserModel.query().findById(req.params.user));
}));
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const user = yield UserModel_1.UserModel.query().findOne("username", req.body.username);
    const passHash = createHash("sha256").update(req.body.password).digest("hex");
    console.log(passHash);
    console.log(user === null || user === void 0 ? void 0 : user.passHash);
    if (passHash === (user === null || user === void 0 ? void 0 : user.passHash)) {
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).send({ message: "Logged in", accessToken: token });
    }
    else {
        res.status(401).send({ message: "Unauthorized" });
    }
}));
app.get('/api/profile', passport_1.default.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ profile: req.user });
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
