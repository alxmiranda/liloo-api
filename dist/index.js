'use strict';

var _app = require('./app');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _queries = require('./queries');

var _password = require('./utils/password');

var _tempoAcesso = require('./utils/tempoAcesso');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 9002;

var corsOptions = {
  origin: 'http://localhost:9000',
  optionsSuccessStatus: 200
};

_app.app.use(_bodyParser2.default.urlencoded({ extended: true }));
_app.app.use(_bodyParser2.default.json());
_app.app.use((0, _cors2.default)());
_app.app.use('/', _app.router);

_app.app.listen(port, function () {
  console.log('server rodando na portela ' + port);
});

_app.router.get('/', function (req, res) {
  return res.json({ message: 'Funcionando!' });
});

_app.router.get('/clientes', (0, _cors2.default)(corsOptions), function (req, res) {
  (0, _queries.execquery)('SELECT * FROM tb_users', [], function (queryResponse) {
    res.json(queryResponse.result);
    console.log('>>>', queryResponse.result);
  });
});

_app.router.get('/checkout/initiate/:id', function (req, res) {
  //under construction (não remover)

  //aqui serve para criarmos o carrinho
});

_app.router.get('/checkout/create/:id', function (req, res) {
  //under construction (não remover)
  // https://docs.pagar.me/docs/inserindo-o-checkout

  var checkoutOptions = {
    amount: 8000,
    createToken: true,
    postbackUrl: '',
    paymentMethods: 'redit_card',
    customerData: false,
    customer: {
      external_id: '#123456789', //codigo do cliente no meu sistema
      name: 'Fulano',
      type: 'individual',
      country: 'br',
      email: 'fulano@email.com',
      documents: [{
        type: 'cpf',
        number: '71404665560'
      }],
      phone_numbers: ['+5511999998888', '+5511888889999'],
      birthday: '1985-01-01'
    },
    billing: {
      name: 'Ciclano de Tal',
      address: {
        country: 'br',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Fulanos bairro',
        street: 'Rua dos fulanos',
        street_number: '123',
        zipcode: '05170060'
      }
    },
    items: [{
      id: '1', //codigo do meu produto/serviço
      title: 'Bola de futebol',
      unit_price: 12000,
      quantity: 1,
      tangible: true
    }]
  };

  return res.status(200).json(checkoutOptions);
});

_app.router.get('/cliente/:id', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  (0, _queries.execquery)('SELECT * FROM tb_users WHERE IDuser=?', res, [req.params.id]);
});

_app.router.post('/cadastro', function (req, res) {
  var query = 'insert into tb_users (nome, sobrenome, email, senha, ddd, avaliacaoProfissional, IDcategoriaUser, IDservicoUser, oauth_provider, oauth_uid, picture, link, created, modified, locale, gender, codCliente, codClienteEncript,tpCliente) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
  var arrayValues = [req.body.nome, req.body.sobreNome, req.body.email, (0, _password.PasswordCreate)(req.body.senha, 10), '', '', 0, 0, '', '', '', '', '', '', '', '', 0, 0, req.body.tipoCliente];

  (0, _queries.execquery)(query, arrayValues, function (queryResponse) {
    if (queryResponse.result.codeResult === 0) {
      var success = Object.assign(queryResponse.result, { data: null });
      res.json(success);
    } else {
      var error = Object.assign(queryResponse.result, { codeRestult: 1, errorMsg: 'Cadastro não realizado', data: null });
      res.json(error);
    }
    if (!queryResponse.result) queryResponse.con.end();
  });
});

_app.router.get('/validkey/:id', function (req, res) {

  res.send((0, _tempoAcesso.IsValidTime)(req.params.id));
});

_app.router.post('/registerdetails', function (req, res) {
  var headerParams = req.headers;

  if (!(0, _tempoAcesso.IsValidTime)(headerParams.accesskey)) {
    return res.status(401).json({ error: 'invalid access-key' });
  }

  if (headerParams.perfil == undefined) {
    return res.status(401).json({ error: 'perfil needed' });
  }

  var query = 'update tb_users SET nome = ?,email=?,ddd=?,telefone=? WHERE IdUser =?';
  var arrayValues = [req.body.nome, req.body.email, req.body.ddd, req.body.telefone, (0, _password.Decrypt)(headerParams.perfil)];

  (0, _queries.execquery)(query, arrayValues, function (queryResponse) {
    if (!queryResponse.result) {
      queryResponse.con.end();
      return res.status(404).json({ error: 'Not record found' });
    }
    var success = Object.assign(queryResponse.result, { data: null });
    res.json(success);
  });
});

_app.router.get('/registerdetails', function (req, res) {

  var headerParams = req.headers;

  if (!(0, _tempoAcesso.IsValidTime)(headerParams.accesskey)) {
    return res.status(401).json({ error: 'invalid access-key' });
  }

  if (headerParams.perfil == undefined) {
    return res.status(401).json({ error: 'perfil needed' });
  }

  var query = 'select nome, tpCliente,status, email,ddd,telefone from tb_users WHERE IdUser = ?';
  var arrayValues = [(0, _password.Decrypt)(headerParams.perfil)];

  (0, _queries.execquery)(query, arrayValues, function (queryResponse) {
    if (!queryResponse.result) {

      queryResponse.con.end();
      return res.status(404).json({ error: 'Not record found' });
    }

    var dataResponse = Object.assign(queryResponse.result, { data: {
        nome: queryResponse.result.data[0].nome,
        perfil: queryResponse.result.data[0].tpCliente,
        situacao: queryResponse.result.data[0].status == 1 ? "ATIVO" : "INATIVO",
        email: queryResponse.result.data[0].email,
        ddd: queryResponse.result.data[0].ddd,
        telefone: queryResponse.result.data[0].telefone }

    });
    res.json(dataResponse);
  });
});

_app.router.post('/login', function (req, res) {
  var query = 'select IDuser, nome,senha,tpCliente,status from tb_users WHERE email = ?';

  var arrayValues = [req.body.email];

  (0, _queries.execquery)(query, arrayValues, function (queryResponse) {
    console.log(queryResponse);
    var confirmPassword = (0, _password.PasswordCompare)(req.body.senha, queryResponse.result.data[0].senha);
    if (confirmPassword) {
      var successPassword = Object.assign(queryResponse.result, { data: {
          nome: queryResponse.result.data[0].nome,
          pefilSite: Buffer.from(queryResponse.result.data[0].tpCliente).toString("base64"),
          situacao: Buffer.from(queryResponse.result.data[0].status == 1 ? "ATIVO" : "INATIVO").toString("base64"),
          perfilAPI: {
            perfil: (0, _password.Encrypt)(queryResponse.result.data[0].IDuser.toString()),
            accessKey: (0, _tempoAcesso.SetTimeEncrypt)()
          }
        } });
      res.json(successPassword);
    } else {
      var errorPassword = Object.assign(queryResponse.result, { codeRestult: 1, errorMsg: 'Senha inválida', data: null });
      res.json(errorPassword);
    }

    if (!queryResponse.result) queryResponse.con.end();
  });
});
//# sourceMappingURL=index.js.map