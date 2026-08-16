import { Router } from 'express'; // Router cria um mini-app de rotas
import {
  listarAlunos,
  buscarAluno,
  atualizarAluno,
  deletarAluno,
} from '../controllers/alunosController.js'; // importa as funções do controller
import autenticar from '../middlewares/autenticar.js';

const router = Router(); // cria o router

router.get('/', listarAlunos);                     // GET /alunos
router.get('/:id', buscarAluno);                   // GET /alunos/:id
router.put('/:id', autenticar, atualizarAluno);    // PUT /alunos/:id
router.delete('/:id', deletarAluno);               // DELETE /alunos/:id

export default router; // exporta o router para usar no index.js