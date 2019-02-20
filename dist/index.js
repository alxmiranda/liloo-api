'use strict';

var _app = require('./app');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _queries = require('./queries');

var _password = require('./utils/password');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 9002;

var corsOptions = {
  origin: 'http://localhost:9000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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

_app.router.get('/cliente/:id', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log("req.body", req);
  (0, _queries.execquery)('SELECT * FROM tb_users WHERE IDuser=?', res, [req.params.id]);
});

_app.router.post('/cadastro', function (req, res) {
  var query = 'insert into tb_users (nome, sobrenome, email, senha, ddd, avaliacaoProfissional, IDcategoriaUser, IDservicoUser, oauth_provider, oauth_uid, picture, link, created, modified, locale, gender, codCliente, codClienteEncript) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  var arrayValues = [req.body.nome, req.body.sobreNome, req.body.email, (0, _password.PasswordCreate)(req.body.senha, 10), '', '', 0, 0, '', '', '', '', '', '', '', '', 0, 0];

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

_app.router.post('/login', function (req, res) {
  var query = 'SELECT senha FROM tb_users WHERE email = ?';
  var arrayValues = [req.body.email];

  (0, _queries.execquery)(query, arrayValues, function (queryResponse) {
    var confirmPassword = (0, _password.PasswordCompare)(req.body.senha, queryResponse.result.data[0].senha);

    if (confirmPassword) {
      var successPassword = Object.assign(queryResponse.result, { data: null });
      res.json(successPassword);
    } else {
      var errorPassword = Object.assign(queryResponse.result, { codeRestult: 1, errorMsg: 'Senha inválida', data: null });
      res.json(errorPassword);
    }

    if (!queryResponse.result) queryResponse.con.end();
  });
});
//# sourceMappingURL=index.js.map