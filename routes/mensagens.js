import { Router } from 'express';
import {
  listarMensagens,
  criarMensagem,
  deletarMensagem,
} from '../controllers/mensagensController.js';
import autenticar from '../middlewares/autenticar.js';

const router = Router();

router.get('/', listarMensagens);               // GET /mensagens
router.post('/', autenticar, criarMensagem);    // POST /mensagens
router.delete('/:id', deletarMensagem);         // DELETE /mensagens/:id

export default router;