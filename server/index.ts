import { UserModel } from "./models/UserModel";
import 'dotenv/config'

const express = require('express')
const app = express()
const port = 3000

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


app.get('/api/users', async (req, res) => {
  const result = await UserModel.query().select();
  await res.send(result);
  console.log("giving users");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})