import { app } from './app';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const port = process.env.PORT || 9002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(port, () => console.log(`server rodando na porta ${port}`));