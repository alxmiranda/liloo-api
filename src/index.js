import { app, router} from './app';
import cors from 'cors';
import bodyParser from 'body-parser';
import { execquery, connection } from './queries';
import { PasswordCreate, PasswordCompare } from './utils/password';

const port = 9002;

const corsOptions = {
  origin: 'https://api-liloo.wedeploy.io',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(port, () => {
  console.log(`server rodando na portela ${port}`);
})

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

router.get('/clientes', cors(corsOptions), (req, res) => {
  execquery('SELECT * FROM tb_users', [], (queryResponse) => {
    res.json(queryResponse.result);
    console.log('>>>', queryResponse.result);
  } );
})

router.get('/cliente/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  console.log("req.body", req);
  execquery('SELECT * FROM tb_users WHERE IDuser=?', res, [req.params.id]);
})

router.post('/cadastro', (req, res) => {
  const query = `insert into tb_users (nome, sobrenome, email, senha, ddd, avaliacaoProfissional, IDcategoriaUser, IDservicoUser, oauth_provider, oauth_uid, picture, link, created, modified, locale, gender, codCliente, codClienteEncript) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const arrayValues = [req.body.nome, req.body.sobreNome, req.body.email, PasswordCreate(req.body.senha, 10), '', '', 0, 0, '', '', '', '', '', '', '', '', 0, 0]
  
  execquery(query, arrayValues, (queryResponse) =>  {
    if(queryResponse.result.codeResult === 0) {
      const success = Object.assign(queryResponse.result, {data: null});
      res.json(success);
    } else {
      const error = Object.assign(queryResponse.result, {codeRestult: 1, errorMsg: 'Cadastro não realizado', data: null});
      res.json(error);
    }
    if(!queryResponse.result)
      queryResponse.con.end();
  });
})

router.post('/login', (req, res) => {
  const query = 'SELECT senha FROM tb_users WHERE email = ?';
  const arrayValues = [req.body.email]

  execquery(query, arrayValues, (queryResponse) =>  {
    let confirmPassword = PasswordCompare(req.body.senha, queryResponse.result.data[0].senha);

    if(confirmPassword) {
      const successPassword = Object.assign(queryResponse.result, {data: null})
      res.json(successPassword)
    } else {
      const errorPassword = Object.assign(queryResponse.result, {codeRestult: 1, errorMsg: 'Senha inválida', data: null});
      res.json(errorPassword)
    }

    if(!queryResponse.result)
      queryResponse.con.end();
  });

})