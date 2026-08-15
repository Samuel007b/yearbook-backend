import 'dotenv/config';                              // carrega .env
import express from 'express';                       // importa o Express
import cors from 'cors';                             // importa a Cors
import logger from './middlewares/logger.js';        // importa o middleware de log
import tratarErro from './middlewares/erro.js';      // importa o middleware de erro
import authRouter from './routes/auth.js';           // importa o router de auth
import alunosRouter from './routes/alunos.js';       // importa o router de alunos
import mensagensRouter from './routes/mensagens.js'; // importa o router de mensagens

const app = express();                  // cria a aplicação Express
const PORT = process.env.PORT || 3000;  // lê do .env, com fallback para 3000

app.use(cors());            // 1º — libera CORS para qualquer origem
app.use(express.json());    // 2º — parseia body JSON
app.use(logger);            // 3º — registra log

// rota raiz — boas-vindas
app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

// rota de health check
app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// registra as rotas de autenticação com o prefixo /auth
app.use('/auth', authRouter);

// registra as rotas de alunos com prefixo /alunos
app.use('/alunos', alunosRouter);

// registra as rotas de mensagens com prefixo /mensagens
app.use('/mensagens', mensagensRouter);

// Middleware de erro — SEMPRE por último, depois das rotas
app.use(tratarErro);

// inicia o servidor localmente — na Vercel essa parte é pulada
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// exporta o app para a Vercel usar como serverless function
export default app;