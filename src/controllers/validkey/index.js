import { IsValidTime } from './../../utils/tempoAcesso';

const validkey = (req, res) => res.send(IsValidTime( req.params.id ));

export {
  validkey,
}