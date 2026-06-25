import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// GET /mensagens — lista todas as mensagens (mais recentes primeiro, com dados do autor)
export async function listarMensagens(req, res) {
  const mensagens = await prisma.mensagem.findMany({
    orderBy: { criadoEm: 'desc' },  // mais recente primeiro
    include: {
      autor: {                        // traz dados do autor junto
        select: {
          nome: true,                 // nome do autor
          fotoUrl: true,              // foto do autor
        },
      },
    },
  });
  res.json(mensagens); // retorna a lista com autor embutido
}

// --- Stubs para o desafio do aluno ---

// 🎯 POST /mensagens — cria uma nova mensagem
// Siga o mesmo padrão do criarAluno
// Valide que texto não está vazio (400 se faltar)
export async function criarMensagem(req, res) {
  const { texto, imagemUrl, autorId } = req.body; // extrai os dados
  if (!texto) {
    return res.status(400).json({ erro: 'O campo texto é obrigatório' }); // invalid → 400
  }
  const novaMensagem = await prisma.mensagem.create({
    data: {
      texto: texto,
      imagemUrl: imagemUrl,
      autorId: Number(autorId)
    },
  });
  res.status(201).json(novaMensagem); // created → 201
}

// 🎯 DELETE /mensagens/:id — deleta uma mensagem
// Siga o mesmo padrão do deletarAluno
export async function deletarMensagem(req, res) {
  const { id } = req.params; // extrai o :id da URL
  try{
    await prisma.mensagem.delete({
      where: { id: Number(id) } // converte string → number
    })
    res.status(204).end() // deleted → 204
  }
  catch(error){
    return res.status(404).json({ erro: 'Mensagem não encontrada' }); // null → 404
  }
}