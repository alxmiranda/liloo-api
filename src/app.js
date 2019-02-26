import express from 'express';
require('dotenv').config();

const app = express();
const router = express.Router();

console.log(process.env.DB_HOST);

export {
  app,
  router
};