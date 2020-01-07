import express from 'express';
require('dotenv').config();

const app = express();

console.log(process.env.DB_HOST);

export {
  app
};