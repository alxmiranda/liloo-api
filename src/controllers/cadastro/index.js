import { execquery } from './../../queries';
import { PasswordCreate, Decrypt } from './../../utils/password';
import { IsValidTime } from './../../utils/tempoAcesso';

const cadastro = (req, res) => {
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
}

const registerDetails = (req, res) => {
  const headerParams = req.headers;

  if(!IsValidTime(headerParams.accesskey )) {
    return res.status(401).json({error: 'invalid access-key'}) 
  }

  if(headerParams.perfil == undefined) {
    return res.status(401).json({error: 'perfil needed'}) 
  }

  const query = `update tb_users SET nome = ?,email=?,ddd=?,telefone=?,cpf=?,data_nascimento=? WHERE IdUser =?`;
 
  const arrayValues = [req.body.nome, req.body.email, req.body.ddd, req.body.telefone,req.cpf,req.dataNascimento, Decrypt(headerParams.perfil)]
  
  execquery(query, arrayValues, (queryResponse) => {
    if(!queryResponse.result){
      queryResponse.con.end();
      return res.status(404).json({error: 'Not record found'}) 
    }
    const success = Object.assign(queryResponse.result, {data: null});
    res.json(success);
  });
}

const getRegisterDetails = (req, res) => {
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
}

export {
  cadastro,
  registerDetails,
  getRegisterDetails,
}