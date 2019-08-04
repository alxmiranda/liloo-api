import { app, router} from './app';
import cors from 'cors';
import bodyParser from 'body-parser';
import { execquery } from './queries';
import { PasswordCreate, PasswordCompare, Encrypt, Decrypt } from './utils/password';
import { SetTimeEncrypt, IsValidTime } from './utils/tempoAcesso'


const port = process.env.PORT || 9002;

const corsOptions = {
  origin: 'http://localhost:9000',
  optionsSuccessStatus: 200 
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
});

router.get('/cliente/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  execquery('SELECT * FROM tb_users WHERE IDuser=?', res, [req.params.id]);
});

router.post('/cadastro', (req, res) => {
  const query = `insert into tb_users (nome, sobrenome, email, senha, ddd, avaliacaoProfissional, IDcategoriaUser, IDservicoUser, oauth_provider, oauth_uid, picture, link, created, modified, locale, gender, codCliente, codClienteEncript,tpCliente) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
  const arrayValues = [req.body.nome, req.body.sobreNome, req.body.email, PasswordCreate(req.body.senha, 10), '', '', 0, 0, '', '', '', '', '', '', '', '', 0, 0,req.body.tipoCliente]
  
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
});

router.get('/validkey/:id',(req,res)=>{
  
  res.send( IsValidTime( req.params.id ));

});

router.post('/registerdetails',(req,res)=>{
  const headerParams = [req.headers];

  if(!IsValidTime(headerParams['accessKey'] )){
    return res.status(401).json({error: 'invalid access-key'}) 
  }

  if(headerParams['perfil'] == undefined){
    return res.status(401).json({error: 'perfil needed'}) 
  }

  const query = `update tb_users SET nome = ?,email=?,ddd=?,telefone=?,tpCliente =? WHERE IdUser =?`;
  const arrayValues = [req.body.nome, req.body.email, req.body.ddd, req.body.telefone, req.body.perfil, Decrypt(headerParams['perfil']) ]
  
  execquery(query, arrayValues, (queryResponse) =>  {
    if(queryResponse.result.codeResult === 0) {
      const success = Object.assign(queryResponse.result, {data: null});
      res.json(success);
    } else {
      const error = Object.assign(queryResponse.result, {codeRestult: 1, errorMsg: 'Dados atualizados com sucesso!', data: null});
      res.json(error);
    }
    if(!queryResponse.result)
      queryResponse.con.end();
  });
});

router.get('/registerdetails', (req,res) => {

  const headerParams = req.headers;

  if (!IsValidTime(headerParams.accesskey)) {
    return res.status(401).json({error: 'invalid access-key'}) 
  }

  if (headerParams.perfil == undefined) {
    return res.status(401).json({error: 'perfil needed'}) 
  }

  const query = `select nome, tpCliente,status, email,ddd,telefone from tb_users WHERE IdUser = ?`;
  const arrayValues = [Decrypt(headerParams.perfil)];

  execquery(query, arrayValues, (queryResponse) =>  {
    if(!queryResponse.result){
      
      queryResponse.con.end();
      return res.status(404).json({error: 'Not record found'}) 

    }

      const dataResponse = Object.assign(queryResponse.result, {data: {
                                                                      nome: queryResponse.result.data[0].nome,
                                                                      perfil:queryResponse.result.data[0].tpCliente ,
                                                                      situacao: queryResponse.result.data[0].status == 1 ? "ATIVO" : "INATIVO",
                                                                      email: queryResponse.result.data[0].email,
                                                                      ddd : queryResponse.result.data[0].ddd,
                                                                      telefone: queryResponse.result.data[0].telefone}
                                                                      
      });
      res.json(dataResponse)    
      
  });
});

router.post('/login', (req, res) => {
  const query = 'select IDuser, nome,senha,tpCliente,status from tb_users WHERE email = ?';
  

  const arrayValues = [req.body.email];
 
  execquery(query, arrayValues, (queryResponse) =>  {
    console.log(queryResponse);
    let confirmPassword = PasswordCompare(req.body.senha, queryResponse.result.data[0].senha);
    if(confirmPassword) {
      const successPassword = Object.assign(queryResponse.result, {data: {
                                                                      nome: queryResponse.result.data[0].nome,
                                                                      pefilSite: Buffer.from(queryResponse.result.data[0].tpCliente ).toString("base64"),
                                                                      situacao: Buffer.from(queryResponse.result.data[0].status == 1 ? "ATIVO" : "INATIVO" ).toString("base64"),
                                                                      perfilAPI : {
                                                                        perfil: Encrypt((queryResponse.result.data[0].IDuser).toString() ),
                                                                        accessKey: SetTimeEncrypt()  ,
                                                                      }
      }});
      res.json(successPassword)
    } else {
      const errorPassword = Object.assign(queryResponse.result, {codeRestult: 1, errorMsg: 'Senha inválida', data: null});
      res.json(errorPassword)
    }

    if(!queryResponse.result)
      queryResponse.con.end();
  });

})