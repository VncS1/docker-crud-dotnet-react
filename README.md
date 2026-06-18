# Sistema de Gerenciamento de Usuários (Docker & Fullstack)

Este projeto é um desafio técnico Fullstack desenvolvido com **C# (.NET 8)** no backend e **React (Vite)** no frontend. Ele implementa um sistema seguro de autenticação (Cadastro e Login) e listagem de usuários, rodando de forma 100% conteinerizada e isolada.

## Tecnologias e Decisões Arquiteturais

- **Backend:** C# (.NET 8) Web API.
  - *Arquitetura:* N-Layer simplificada (separação de responsabilidades entre Controllers, DTOs e Data Access).
  - *ORM & Banco de Dados:* Entity Framework Core (com Pomelo MySQL). **Auto-migration configurada** para aplicar a estrutura do banco automaticamente ao subir a aplicação.
  - *Segurança:* Hash de senhas com **BCrypt** e autenticação via **JWT utilizando Cookies HttpOnly**. Esta decisão técnica foi tomada para mitigar ataques XSS (Cross-Site Scripting), delegando ao navegador o transporte seguro da credencial e evitando a exposição do token no `localStorage` do frontend. O backend conta com extração customizada de JWT via cookies e um endpoint dedicado para logout seguro.
- **Frontend:** React (Vite).
  - *Estilização:* Tailwind CSS v4 para prototipagem rápida e limpa.
  - *Roteamento:* React Router DOM (usando `createBrowserRouter` respeitando o princípio Open/Closed do SOLID).
  - *HTTP:* Axios com interceptors configurados (`withCredentials: true`) para aceitar e enviar os cookies HttpOnly automaticamente de/para a API.
- **Infraestrutura (DevOps):** - *Docker & Docker Compose:* Orquestração de 3 containers (MySQL, API .NET e Nginx para o React).
  - *Multi-stage Builds:* Otimização extrema na geração de imagens, utilizando SDKs para compilação e Runtimes/Nginx enxutos para o ambiente de produção.

## ⚙️ Pré-requisitos

Graças à arquitetura baseada em containers, você **não precisa** ter o .NET, Node.js ou MySQL instalados na sua máquina. Você precisará apenas de:

1. **Git** (para clonar o repositório).
2. **Docker Desktop** (ou Docker Engine com a extensão Docker Compose instalada e rodando).

---

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO_AQUI>
cd docker-crud-dotnet-react
```

### 2. Iniciar os Containers (Orquestração)
Na raiz do projeto (onde está o arquivo `docker-compose.yml`), abra o terminal e execute o comando de build e orquestração:

```bash
docker compose up --build
```

> **O que esse comando faz?**
> Ele fará o download do MySQL 8, compilará a API em C#, fará o build de produção do frontend em React (servido via Nginx), criará uma rede virtual isolada entre eles e rodará as *Migrations* automaticamente no banco de dados vazio.

### 3. Acessar a Aplicação
Quando os logs estabilizarem no terminal, o sistema estará pronto para uso:

- **Frontend (Interface):** [http://localhost:5173](http://localhost:5173)
- **Backend (Swagger API):** [http://localhost:5062/swagger](http://localhost:5062/swagger)
- **Banco de Dados (MySQL):** Rodando na porta `3306` mapeada para o seu localhost (Usuário: `root` / Senha: *vazia*).

---

## Autor
Vinicius Machioni