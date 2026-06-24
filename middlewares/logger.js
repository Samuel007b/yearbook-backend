// Middleware de log — registra cada requisição no terminal
export default function logger(req, res, next) {
  const inicio = Date.now()                     // marca o momento da chegada
  res.on('finish', () => {                      // quando a resposta for enviada...
    const duracao = Date.now() - inicio;        // calcula quanto tempo levou
    const agora = new Date().toISOString();     // timestamp no formato ISO
    console.log(`[${agora}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duracao}ms)`);  // exibe no terminal
  })
  next();                                       // passa para o próximo middleware/rota
}