import { UserModel } from "./models/UserModel";

const express = require('express')
const app = express()
const port = 3000

export const knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
  migrations: 
});


app.get('/api/users', (req, res) => {
  await res.send(UserModel.query().select("username", "role", "firstName", "lastName"));
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})