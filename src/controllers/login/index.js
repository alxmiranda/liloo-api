import { PasswordCompare, Encrypt } from './../../utils/password';
import { SetTimeEncrypt } from './../../utils/tempoAcesso';
import { execquery } from '../../queries/';

const login = (req, res) => {
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
}

export {
  login,
}