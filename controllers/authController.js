import prisma from '../prisma/client.js';
import { hashSenha, verificarSenha } from '../utils/senha.js'; // da aula 21
import { gerarToken } from '../utils/jwt.js';   // da aula 22

// select que omite senhaHash — igual ao do alunosController
const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  cidade: true,
  frase: true,
  planosFuturos: true,
  fotoUrl: true,
  role: true,
  criadoEm: true,
};

// POST /auth/register — cria uma conta com a senha hasheada
export async function register(req, res, next) {
  try {
    const { nome, email, senha, cidade, frase, planosFuturos } = req.body;

    // valida os campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
    }

    // transforma a senha em texto puro num hash seguro
    const senhaHash = await hashSenha(senha);

    // cria o aluno; select garante que senhaHash NÃO volta na resposta
    const aluno = await prisma.aluno.create({
      data: { nome, email, senhaHash, cidade, frase, planosFuturos },
      select: selectSemSenha,
    });

    res.status(201).json(aluno);
  } catch (erro) {
    // P2002 = violação de campo único (email já existe)
    if (erro.code === 'P2002') {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }
    next(erro); // qualquer outro erro vai para o middleware global
  }
}

// POST /auth/login — autentica o usuário e retorna um token JWT
export async function login(req, res, next) {
  try{
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }
    const aluno = await prisma.aluno.findUnique({ where: { email } });
    if (!aluno) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    if (!(await verificarSenha(senha, aluno.senhaHash))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    const token = gerarToken(aluno);
    res.json({ token });
  } catch (erro) {
    next(erro);
  }
}