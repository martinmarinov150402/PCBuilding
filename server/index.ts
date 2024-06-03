import { UserModel } from "./models/UserModel";
import 'dotenv/config';
import bodyParser from 'body-parser';
import { validateData } from "./middleware/validationMiddleware";
import { userRegistrationSchema } from "./schemas/userSchemas";

const express = require('express')
const app = express()
const port = 3000
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

app.use(bodyParser.json());


app.get('/api/users', async (req, res) => {
  const result = await UserModel.query().select();
  await res.send(result);
  console.log("giving users");
})

app.post('/api/users', validateData(userRegistrationSchema), async (req, res) => {
    const newUser = new UserModel();
    newUser.username = req.body.username;
    newUser.passHash = createHash("sha256").update(req.body.password).digest("hex")
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    await UserModel.query().insert(newUser);
    res.send(newUser);
})

app.patch('/api/users/:user', async (req, res) => {
  console.log("HUI");
  await UserModel.query().findById(req.params.user).patch(req.body);
  res.send(await UserModel.query().findById(req.params.user));
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})