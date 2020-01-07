import express from 'express';
import { initiate, create } from './../src/controllers/checkout';
import { getClientes } from './../src/controllers/clientes';
import { cadastro, registerDetails, getRegisterDetails } from './../src/controllers/cadastro';
import { validkey } from './../src/controllers/validkey';
import { login } from './../src/controllers/login';

const routes = express.Router();

routes.get('/checkout/initiate/:id', initiate);
routes.get('/checkout/create/:id', create);
routes.get('/cliente/:id', getClientes);
routes.get('/validkey/:id', validkey);
routes.get('/registerdetails', getRegisterDetails);

routes.post('/cadastro', cadastro);
routes.post('/registerdetails', registerDetails);
routes.post('/login', login);

export default routes;
