import { UserModel } from "./models/UserModel";
import 'dotenv/config';
import { validateData } from "./middleware/validationMiddleware";
import { userRegistrationSchema } from "./schemas/userSchemas";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigurationModel } from "./models/ConfigurationModel";
import { PartModel } from "./models/PartModel";
import { ConfigurationPartModel } from "./models/ConfigurationPartModel";
import { UserRole } from "./UserRoleEnum";


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      console.log(payload);
      //const user = await UserModel.query().findById(payload.user.id);
      if (payload.user) return done(null, payload.user);
    } catch (error) {
      return done(error);
    }
  })
);


const express = require('express')
const app = express()
const port = 3000
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
app.use(cors({origin: '*'}));


app.get('/api/users', async (req, res) => {
  const result = await UserModel.query().select();
  await res.send(result);
  console.log("giving users");
})

app.get('/api/users/:user', async (req, res) => {
  const result = (await UserModel.query().select().where("id", req.params.user))[0];
  const response = {
    ...result,
    passHash: "Nothing to see here :)"
  };
  res.status(200).send(response);

})

app.post('/api/users', validateData(userRegistrationSchema), async (req, res) => {
    const newUser = new UserModel();
    newUser.username = req.body.username;
    newUser.passHash = createHash("sha256").update(req.body.password).digest("hex")
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.role = UserRole.User;
    await UserModel.query().insert(newUser);
    res.send(newUser);
})

app.get('/api/profile', passport.authenticate("jwt", {session: false}), async (req, res) => {
  if(req.user) {
    res.status(200).send(req.user)
  }
  else {
    res.status(401).send("Unauthorized");
  }
})

app.patch('/api/users/:user', passport.authenticate("jwt", {session: false}), async (req, res) => {

  
  console.log(req.user);
  await UserModel.query().findById(req.user).patch(req.body);
  res.send(await UserModel.query().findById(req.params.user));
});
app.post('/api/login', async (req, res) => {
  console.log(req.body);
  const user = await UserModel.query().findOne("username", req.body.username)
  const passHash = createHash("sha256").update(req.body.password).digest("hex");
  console.log(passHash)
  console.log(user?.passHash);
  if(passHash === user?.passHash) {
    const token = jwt.sign({user: user}, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).send({message: "Logged in", accessToken: token});
  }
  else {
    res.status(401).send({message: "Unauthorized"});
  }
})
app.get('/api/profile', passport.authenticate("jwt", {session: false}), async (req, res) => {
  res.status(200).send({profile: req.user});
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

//Configurations

app.get("/api/configuration", async function(req, res) {
    const configurations = await ConfigurationModel.query().select("*");
    res.status(200).send(configurations)
})


//Parts

app.get("/api/parts", async function (req, res) {
  const parts = await PartModel.query().select("*");
  res.status(200).send(parts);
})

app.get("/api/configuration/:configuration", async function (req, res) {
  console.log(req.params);
  const configuration = await ConfigurationModel.query().withGraphJoined("parts").where("configurations.id", req.params.configuration)
  res.status(200).send(configuration[0]);
})

app.post("/api/part", passport.authenticate("jwt", {session: false}), async function (req, res) {
  if(req.user.role === UserRole.User)
  {
    res.status(401).send("Unauthorized");
  }
  else
  {
    const part = new PartModel();
    part.partBrand = req.body.partBrand;
    part.partModel = req.body.partModel;
    part.partDescription = req.body.partDescription;
    part.partIndex = req.body.partIndex;
    part.partType = req.body.partType;
    await PartModel.query().insert(part);
    res.status(201).send(part);
  }
})

app.post("/api/configuration", passport.authenticate("jwt", {session: false}), async function (req, res) {
  const configuration = new ConfigurationModel();
  configuration.authorId = req.user.id;
  configuration.description = req.body.description;
  configuration.title = req.body.title;
  
  await ConfigurationModel.query().insert(configuration);
  const conf = await ConfigurationModel.query().findOne(configuration);
  const parts = req.body.parts.split(", ");
  const models = parts.map(element => {
    return {partId: parseInt(element), configurationId: conf?.id};
  });
  console.log(models);
  await ConfigurationPartModel.query().insert(models);
  res.status(201).send(configuration);
})

