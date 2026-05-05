# API do Yearbook — Documentação de Endpoints

    Base URL (produção): `https://yearbook-backend-chi.vercel.app/`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senhaHash` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`

## Auth

    ### POST /auth/register

    Cria uma nova conta de aluno.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "senha": "minhasenha123",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `409` — Email já cadastrado
    

    ### POST /auth/login

    Autentica um aluno e retorna um token JWT.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "email": "maria@email.com",
      "senha": "minhasenha123"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)

## Alunos

    ### GET /alunos

    Lista todos os alunos

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    [
      {
        "id": 1,
        "nome": "Maria Silva",
        "email": "maria@email.com",
        "cidade": "Salinas",
        "frase": "Aqui começa o futuro.",
        "planosFuturos": "Cursar Ciência da Computação na UFMG",
        "fotoUrl": null,
        "role": "USER",
        "criadoEm": "2026-04-03T10:30:00.000Z"
      },
      {
        "id": 2,
        "nome": "João Pedro",
        "email": "joao@email.com",
        "cidade": "Taiobeiras",
        "frase": "A esperança é a última que morre.",
        "planosFuturos": "Cursar Medicina na Unimontes",
        "fotoUrl": "joao.png",
        "role": "USER",
        "criadoEm": "2026-04-04T20:15:00.000Z"
      },
      {
        "id": 3,
        "nome": "Lucia Figueiredo",
        "email": "lucia@email.com",
        "cidade": "Rubelita",
        "frase": "Nunca desista dos seus sonhos.",
        "planosFuturos": "Cursar Direito na UFVJM",
        "fotoUrl": null,
        "role": "USER",
        "criadoEm": "2026-04-05T15:00:00.000Z"
      }
    ]
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)
    

    ### GET /alunos/:id

    Busca um aluno pelo ID

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `404` — Usuário não encontrado (usuário com ID não existe)


    ### PUT /alunos/:id

    Atualiza o próprio perfil

    - **Autenticação:** Bearer token
    - **Body:**

    ```json
    {
      "nome": "Mario da Silva",
      "cidade": "Fruta de Leite",
      "frase": "Aqui termina o passado.",
      "planosFuturos": "Cursar Engenharia de Software na UFMG",
      "fotoUrl": "mario.png"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "id": 1,
      "nome": "Mario da Silva",
      "email": "maria@email.com",
      "cidade": "Fruta de Leite",
      "frase": "Aqui termina o passado.",
      "planosFuturos": "Cursar Engenharia de Software na UFMG",
      "fotoUrl": "mario.png",
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)
      - `403` — Usuário não autorizado (mudança dos dados de outro usuário)
      - `404` — Usuário não encontrado (usuário com ID não existe)
    

    ### DELETE /alunos/:id

    Remove um aluno

    - **Autenticação:** Bearer token (admin)
    - **Body:** Nenhum

    - **Resposta de sucesso:** `204 Deleted`

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)
      - `403` — Usuário não autorizado (usuário não é administrador)
      - `404` — Usuário não encontrado (usuário com ID não existe)

## Mensagens

    ### GET /mensagens

    Lista todas as mensagens do mural

    - **Autenticação:** Não
    - **Body:** Nenhum

    - **Resposta de sucesso:** `200 OK`

    ```json
    [
      {
        "id": 1,
        "texto": "Criação da documentação do Yearbook",
        "imagemUrl ": "yearbook.png",
        "criadoEm": "2026-04-03T11:30:00.000Z",
        "autor": {
          "id": 1,
          "nome": "Mario da Silva",
          "fotoUrl": "mario.png"
        }
      },
      {
        "id": 2,
        "texto": "Marcação das provas de WEB",
        "imagemUrl ": null,
        "criadoEm": "2026-04-04T21:00:00.000Z",
        "autor": {
          "id": 2,
          "nome": "João Pedro",
          "fotoUrl": "joao.png"
        }
      },
      {
        "id": 3,
        "texto": "Seção de fotos das turmas A e B para Yearbook",
        "imagemUrl ": "fotografia.png",
        "criadoEm": "2026-04-05T16:00:00.000Z",
        "autor": {
          "id": 3,
          "nome": "Lucia Figueiredo",
          "fotoUrl": null
        }
      }
    ]
    ```

    - **Erros:**
      - `204` — Lista de mensagens vazia (não há mensagens)


    ### POST /mensagens

    Cria uma nova mensagem

    - **Autenticação:** Bearer token
    - **Body:** 

    ```json
    {
      "texto": "Criação da documentação do Yearbook",
      "imagemUrl ": "yearbook.png"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "texto": "Criação da documentação do Yearbook",
      "imagemUrl ": "yearbook.png",
      "criadoEm": "2026-04-03T11:30:00.000Z",
      "autor": {
        "id": 1,
        "nome": "Mario da Silva",
        "fotoUrl": "mario.png"
      }
    }
    ```

    - **Erros:**
      - `400` — Dados incompletos (faltou campo obrigatório)
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)


    ### DELETE /mensagens/:id

    Exclui uma mensagem

    - **Autenticação:** Bearer token
    - **Body:** Nenhum

    - **Resposta de sucesso:** `204 Deleted`

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)
      - `403` — Usuário não autorizado (usuário não é administrador)