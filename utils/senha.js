import bcrypt from 'bcryptjs'; // importa a biblioteca de hash

const SALT_ROUNDS = 10; // força do hash — 10 é o padrão recomendado

// recebe a senha em texto puro e devolve o hash (uma Promise)
export async function hashSenha(senha) {
  return bcrypt.hash(senha, SALT_ROUNDS); // gera o hash com salt automático
}

export async function verificarSenha(senha, hash) {
  return await bcrypt.compare(senha, hash);
}