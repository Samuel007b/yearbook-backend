import jwt from 'jsonwebtoken'; // biblioteca de tokens

const SEGREDO = process.env.JWT_SECRET; // lê a chave secreta do .env
const EXPIRACAO = '7d'; // o token vale por 7 dias

// recebe o aluno e devolve um token assinado com id e role no payload
export function gerarToken(aluno) {
  const payload = {
    id: aluno.id, // identifica o aluno
    role: aluno.role, // USER ou ADMIN — usado na autorização
  };
  return jwt.sign(payload, SEGREDO, { expiresIn: EXPIRACAO });
}

export function verificarToken(token) {
  return jwt.verify(token, SEGREDO);
}