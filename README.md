# Sistema de Gerenciamento de Usuários

Este projeto é um desafio técnico Fullstack desenvolvido com **C# (.NET 8)** no backend e **React (Vite)** no frontend. Ele implementa um sistema seguro de autenticação (Cadastro e Login) e listagem de usuários.

## Tecnologias e Decisões Arquiteturais

- **Backend:** C# (.NET 8) Web API.
  - *Arquitetura:* N-Layer simplificada (separação de responsabilidades entre Controllers, DTOs e Data Access).
  - *ORM:* Entity Framework Core (com Pomelo MySQL).
  - *Segurança:* Hash de senhas com **BCrypt** e autenticação via **JWT utilizando Cookies HttpOnly**. Esta decisão técnica foi tomada para mitigar ataques XSS (Cross-Site Scripting), delegando ao navegador o transporte seguro da credencial e evitando a exposição do token no `localStorage` do frontend.
- **Frontend:** React (Vite).
  - *Estilização:* Tailwind CSS v4 para prototipagem rápida e limpa.
  - *Roteamento:* React Router DOM (usando `createBrowserRouter` respeitando o princípio Open/Closed do SOLID para facilitar futuras extensões).
  - *HTTP:* Axios com interceptors configurados (`withCredentials: true`) para aceitar e enviar os cookies HttpOnly automaticamente de/para a API.
- **Banco de Dados:** MySQL.

## ⚙️ Pré-requisitos

Para rodar este projeto em uma nova máquina, você precisará ter instalado:

1. **Git** (para clonar o repositório).
2. **.NET 8.0 SDK** (Ambiente de desenvolvimento C#).
3. **Node.js** (Ambiente JavaScript, que já inclui o `npm`).
4. **MySQL** rodando localmente (Pode ser utilizado o Laragon, XAMPP, Docker ou a instalação nativa do MySQL Server).

---

## Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO_AQUI>
cd GrandPneus_Test
```

### 2. Configurar o Banco de Dados e API (Backend)
1. Certifique-se de que o seu serviço do **MySQL** está rodando.
2. No terminal, navegue até a pasta do backend:
   ```bash
   cd backend
   ```
3. Abra o arquivo `appsettings.json` e verifique a `ConnectionString`. Ajuste o `User` e a `Password` conforme o seu ambiente local (se usar Laragon, o padrão costuma ser usuário `root` e senha vazia):
   ```json
   "DefaultConnection": "Server=localhost;Database=user_management_db;User=root;Password=;"
   ```
4. Restaure as dependências do projeto C#:
   ```bash
   dotnet restore
   ```
5. Instale a ferramenta do Entity Framework globalmente na sua nova máquina:
   ```bash
   dotnet tool install --global dotnet-ef --version 8.0.11
   ```
   *(Nota: Se houver problemas com o PATH do Windows, reinicie o terminal após a instalação).*
6. Rode as migrations para criar o banco de dados e as tabelas:
   ```bash
   dotnet ef database update
   ```
7. Inicie a API:
   ```bash
   dotnet run
   ```
*A API estará rodando em `http://localhost:5000` (ou na porta especificada no terminal).*

### 3. Configurar e Rodar o Frontend
1. Abra **um novo terminal** (mantenha a API rodando no outro) e navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências do Node:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
*Acesse a aplicação no seu navegador através do endereço `http://localhost:5173`.*

---

## Autor
Vinicius Machioni