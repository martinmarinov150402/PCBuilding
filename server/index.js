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
const ConfigurationModel_1 = require("./models/ConfigurationModel");
const PartModel_1 = require("./models/PartModel");
const ConfigurationPartModel_1 = require("./models/ConfigurationPartModel");
const UserRoleEnum_1 = require("./UserRoleEnum");
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require('cors');
app.use(cors({ origin: '*' }));
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield UserModel_1.UserModel.query().select();
    yield res.send(result);
    console.log("giving users");
}));
app.get('/api/users/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield UserModel_1.UserModel.query().select().where("id", req.params.user))[0];
    const response = Object.assign(Object.assign({}, result), { passHash: "Nothing to see here :)" });
    res.status(200).send(response);
}));
app.post('/api/users', (0, validationMiddleware_1.validateData)(userSchemas_1.userRegistrationSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new UserModel_1.UserModel();
    newUser.username = req.body.username;
    newUser.passHash = createHash("sha256").update(req.body.password).digest("hex");
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.role = UserRoleEnum_1.UserRole.User;
    yield UserModel_1.UserModel.query().insert(newUser);
    res.send(newUser);
}));
app.get('/api/profile', passport_1.default.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        res.status(200).send(req.user);
    }
    else {
        res.status(401).send("Unauthorized");
    }
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
//Configurations
app.get("/api/configuration", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const configurations = yield ConfigurationModel_1.ConfigurationModel.query().select("*");
        res.status(200).send(configurations);
    });
});
//Parts
app.get("/api/parts", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const parts = yield PartModel_1.PartModel.query().select("*");
        res.status(200).send(parts);
    });
});
app.get("/api/configuration/:configuration", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.params);
        const configuration = yield ConfigurationModel_1.ConfigurationModel.query().withGraphJoined("parts").where("configurations.id", req.params.configuration);
        res.status(200).send(configuration[0]);
    });
});
app.post("/api/part", passport_1.default.authenticate("jwt", { session: false }), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const part = new PartModel_1.PartModel();
        part.partBrand = req.body.partBrand;
        part.partModel = req.body.partModel;
        part.partDescription = req.body.partDescription;
        part.partIndex = req.body.partIndex;
        part.partType = req.body.partType;
        yield PartModel_1.PartModel.query().insert(part);
        res.status(201).send(part);
    });
});
app.post("/api/configuration", passport_1.default.authenticate("jwt", { session: false }), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const configuration = new ConfigurationModel_1.ConfigurationModel();
        configuration.authorId = req.user.id;
        configuration.description = req.body.description;
        configuration.title = req.body.title;
        yield ConfigurationModel_1.ConfigurationModel.query().insert(configuration);
        const conf = yield ConfigurationModel_1.ConfigurationModel.query().findOne(configuration);
        const parts = req.body.parts.split(", ");
        const models = parts.map(element => {
            return { partId: parseInt(element), configurationId: conf === null || conf === void 0 ? void 0 : conf.id };
        });
        console.log(models);
        yield ConfigurationPartModel_1.ConfigurationPartModel.query().insert(models);
        res.status(201).send(configuration);
    });
});
