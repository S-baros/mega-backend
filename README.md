# mega-projeto — Backend

API REST do Sistema de Gestão de Projetos e Alocação de Membros da Mega Jr.

## Stack

- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT
- Swagger

## Pré-requisitos

- Node.js v18+
- PostgreSQL

## Como rodar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o `.env`

```bash
cp .env.example .env
```

Preencha o `.env` com suas credenciais:

```env
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/mega_db"
JWT_SECRET="sua_chave_secreta"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### 3. Rode as migrations

```bash
npx prisma migrate dev --name init
```

### 4. Dados iniciais (opcional)

```bash
npm run db:seed
```

### 5. Inicie o servidor

```bash
npm run dev
```

- API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

## Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
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
| GET | /dashboard | Painel gerencial | ✅ |

Rotas com ✅ exigem header: `Authorization: Bearer <token>`
