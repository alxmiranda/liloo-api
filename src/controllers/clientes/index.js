import { execquery } from './../../queries';

const getClientes = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  execquery('SELECT * FROM tb_users WHERE IDuser=?', res, [req.params.id]);
}

export {
  getClientes
}