# 🌿 ECOA Dashboard

<h3 align="center">
Comunidade que transforma inovação em impacto.
</h3>

---

## 📘 Sobre o Projeto

O **ECOA Dashboard** é uma plataforma voltada para **impulsionar práticas sustentáveis nas empresas**, oferecendo ferramentas que auxiliam no **monitoramento de indicadores ESG (ambientais, sociais e de governança)**.

Este repositório contém o **backend** do sistema, desenvolvido em **Node.js**, responsável por gerenciar a **autenticação de usuários**, **armazenamento de dados**, **acesso à API** e **integração com o frontend**.

O projeto faz parte da iniciativa **IntenseGP - ESGTech**, que visa unir inovação, tecnologia e impacto positivo no meio corporativo.

---

## 🎯 Objetivos do Projeto

- Desenvolver o **backend** da plataforma ECOA.  
- Implementar o **sistema de autenticação de usuários** (cadastro, login, recuperação de senha).  
- Integrar com o **frontend** (interface web do dashboard).  
- Estruturar e manter o **banco de dados PostgreSQL** das empresas cadastradas.  
- Prover endpoints para os módulos de:
  - Dashboard
  - Questionários ESG
  - Planos de ação
  - Relatórios
  - Academia de sustentabilidade

---

## 🚧 Desafios

- Criar uma **API RESTful** modular, segura e escalável.  
- Implementar **JWT (JSON Web Token)** para autenticação.  
- Garantir **validação de dados** e **criptografia de senhas**.  
- Facilitar a **integração entre backend e frontend**.  
- Assegurar **boas práticas de desenvolvimento** e **estrutura limpa de código**.

---

## 💾 Banco de Dados

O projeto utiliza **PostgreSQL** como banco de dados principal, devido à sua robustez, integridade relacional e compatibilidade com ferramentas modernas.

> 💡 O acesso e manipulação dos dados é feito utilizando **Prisma ORM**, facilitando a comunicação entre o banco e a aplicação Node.js.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** — runtime JavaScript  
- **Express.js** — framework para criação da API  
- **Prisma ORM** — integração com banco de dados  
- **PostgreSQL** — banco de dados relacional  
- **JWT** — autenticação segura  
- **bcrypt.js** — criptografia de senhas  
- **dotenv** — variáveis de ambiente  
- **Nodemon** — atualização automática em ambiente de desenvolvimento  

---

## 📂 Estrutura de Pastas

ECOA-Dashboard-Backend/
│
├── src/
│ ├── controllers/
│ │ └── authController.js
│ ├── models/
│ │ └── userModel.js
│ ├── routes/
│ │ └── authRoutes.js
│ ├── middlewares/
│ │ └── authMiddleware.js
│ ├── prisma/
│ │ └── schema.prisma
│ └── server.js
│
├── .env
├── package.json
└── README.md

---

## ⚙️ Como Rodar o Projeto

### 🧩 Pré-requisitos

Antes de começar, você precisa ter instalado:
- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL**
- **Git**

### 🚀 Passo a passo

1. **Clone o repositório** 6. **Acesse no navegador** 
   git clone https://github.com/IntenseGP-ESGTech/ECOA-Dashboard-Squad-6-backend-.git
   cd ECOA-Dashboard-Squad-6-backend-

   
2. **Instale as dependências**
npm install

3. **Configure as variáveis de ambiente**
Crie um arquivo .env na raiz do projeto e adicione:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecoa_db"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000

4. **Execute as migrações (com Prisma)**
npx prisma migrate dev

5. **Inicie o servidor** 
npm run dev

6. **Acesse no navegador** 
http://localhost:3000
---

## 🤝 Colaboradores
- Deyvison Gabriel Guerra Lucas
- Felipe Cisneiros Agostinho
- Glauco Santos Seixas Cerqueira
- Jonas de Lima Neto
- Matheus Rangel Kirzner
---

## 📜 Licença
Este projeto está sob a licença MIT.

