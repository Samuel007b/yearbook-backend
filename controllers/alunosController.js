import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// select que omite senhaHash — reutilizado em todas as queries de alunos
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
  // senhaHash NÃO está aqui — nunca retornado pela API
};

// GET /alunos — lista todos os alunos
export async function listarAlunos(req, res, next) {
  try{
    const alunos = await prisma.aluno.findMany({
      select: selectSemSenha, // retorna todos os campos EXCETO senhaHash
    });
    res.json(alunos); // responde com o array de alunos em JSON
  }
  catch(erro){
    next(erro);  // passa o erro para o middleware global
  }
}

// GET /alunos/:id — busca um aluno pelo ID
export async function buscarAluno(req, res, next) {
  try{
    const { id } = req.params; // extrai o :id da URL
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(id) }, // converte string → number
      select: selectSemSenha,    // omite senhaHash
    });
    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' }); // null → 404
    }
    res.json(aluno); // retorna o aluno encontrado
  }
  catch(erro){
    next(erro);  // passa o erro para o middleware global
  }
}

// PUT /alunos/:id — atualiza um aluno existente
export async function atualizarAluno(req, res, next) {
  try{
    const { id } = req.params; // extrai o :id da URL
    if (Number(id) !== Number(req.aluno.id)) {
      return res.status(403).json({ erro: 'Você só pode editar o próprio perfil' }); // forbidden → 403
    }
    const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body; // extrai os dados
    const aluno = await prisma.aluno.update({
      where: { id: Number(id) },
      data: {
        nome: nome,
        email: email,
        senhaHash: senhaHash,
        cidade: cidade,
        frase: frase,
        planosFuturos: planosFuturos,
      },
      select: selectSemSenha // omite senhaHash
    })
    res.json(aluno); // retorna o aluno atualizado
  }
  catch(erro){
    return res.status(404).json({ erro: 'Aluno não encontrado' }); // null → 404
  }
}

// DELETE /alunos/:id — deleta um aluno
export async function deletarAluno(req, res, next) {
  try{
    const { id } = req.params; // extrai o :id da URL
    await prisma.aluno.delete({
      where: { id: Number(id) } // converte string → number
    })
    res.status(204).end() // deleted → 204
  }
  catch(erro){
    if (erro.code === 'P2003') {
      return res.status(401).json({ erro: 'Aluno com mensagens cadastradas'}); // unauthorized → 401
    }
    return res.status(404).json({ erro: 'Aluno não encontrado' }); // null → 404
  }
}