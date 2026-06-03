# 🦆 Mega Jr. — Backend

API REST do Sistema de Gestão de Projetos e Alocação de Membros.

## Stack

- **Node.js** + **Express**
- **PostgreSQL** (banco de dados)
- **Prisma ORM** (acesso ao banco)
- **JWT** (autenticação)
- **Swagger** (documentação da API)

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [PostgreSQL](https://www.postgresql.org/) instalado e rodando

## Como rodar localmente

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o `.env`

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/mega_db"
JWT_SECRET="troque_por_uma_chave_secreta"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### 3. Crie e migre o banco

```bash
npx prisma migrate dev --name init
```

### 4. Popule com dados de exemplo (opcional)

```bash
npm run db:seed
```

Isso cria:
- Usuário admin: `admin@soumega.com` / senha: `admin123`
- 3 membros de exemplo
- 2 projetos de exemplo
- Alocações de exemplo

### 5. Inicie o servidor

```bash
npm run dev
```

Acesse:
- API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

## Endpoints

| Método | Rota | Descrição | Auth? |
|--------|------|-----------|-------|
| POST | /auth/login | Login | ❌ |
| POST | /auth/register | Cadastro | ❌ |
| GET | /members | Lista membros | ✅ |
| POST | /members | Cria membro | ✅ |
| PUT | /members/:id | Atualiza membro | ✅ |
| DELETE | /members/:id | Remove membro | ✅ |
| GET | /projects | Lista projetos | ✅ |
| POST | /projects | Cria projeto | ✅ |
| PUT | /projects/:id | Atualiza projeto | ✅ |
| DELETE | /projects/:id | Remove projeto | ✅ |
| GET | /allocations | Lista alocações | ✅ |
| POST | /allocations | Cria alocação | ✅ |
| PUT | /allocations/:id | Atualiza alocação | ✅ |
| DELETE | /allocations/:id | Remove alocação | ✅ |
| GET | /dashboard | Dados do painel | ✅ |

> ✅ Rotas protegidas exigem header: `Authorization: Bearer <token>`

## Commits semânticos

Este projeto segue commits semânticos:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `refactor:` refatoração
- `chore:` configuração/dependências
