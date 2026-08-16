import { verificarToken } from '../utils/jwt.js'; // da aula 22

// middleware que exige um token JWT válido
export default function autenticar(req, res, next) {
  const header = req.headers.authorization; // ex: "Bearer eyJ..."

  // 1. o header precisa existir e começar com "Bearer "
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  // 2. separa o token do "Bearer "
  const token = header.split(' ')[1];

  try {
    // 3. valida o token e pega o payload (id e role)
    const payload = verificarToken(token);

    // 4. guarda os dados do aluno na requisição para o controller usar
    req.aluno = { id: payload.id, role: payload.role };

    // 5. libera a passagem
    next();
  } catch (erro) {
    // token adulterado ou expirado cai aqui
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}