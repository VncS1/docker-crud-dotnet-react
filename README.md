# Sistema de Gerenciamento de Usuários (Docker & Fullstack)

Este projeto é um desafio técnico Fullstack desenvolvido com **C# (.NET 8)** no backend e **React (Vite)** no frontend. Ele implementa um sistema seguro de autenticação (Cadastro e Login) e listagem de usuários, rodando de forma 100% conteinerizada e isolada.

## Tecnologias e Decisões Arquiteturais

- **Backend:** C# (.NET 8) Web API.
  - *Arquitetura:* N-Layer simplificada (separação de responsabilidades entre Controllers, DTOs e Data Access).
  - *Validação de Dados:* Uso robusto de Data Annotations nos DTOs para garantir a integridade do payload e barrar requisições malformadas antes de atingirem a camada de negócios.
  - *ORM & Banco de Dados:* Entity Framework Core (com Pomelo MySQL). Configurado com **Auto-migration** e **Auto-seeding** para aplicar a estrutura e popular o banco automaticamente na inicialização.
  - *Segurança:* Hash de senhas com **BCrypt** e autenticação via **JWT utilizando Cookies HttpOnly**. Esta decisão técnica foi tomada para mitigar ataques XSS (Cross-Site Scripting), delegando ao navegador o transporte seguro da credencial e evitando a exposição do token no `localStorage` do frontend. O backend conta com extração customizada de JWT via cookies e um endpoint dedicado para logout seguro.

- **Frontend:** React (Vite).
  - *Estilização e UX:* Tailwind CSS v4 para layouts responsivos (alternando entre tabelas no desktop e cards no mobile) e `react-hot-toast` para feedback visual assíncrono, substituindo alertas nativos.
  - *Roteamento:* React Router DOM (respeitando o princípio Open/Closed do SOLID).
  - *HTTP:* Axios com interceptors configurados (`withCredentials: true`) para aceitar e enviar os cookies HttpOnly automaticamente.

- **Infraestrutura (DevOps):**
  - *Docker & Docker Compose:* Orquestração de 3 containers (MySQL, API .NET e Nginx para o React).
  - *Healthchecks:* Implementados para evitar *race conditions*, garantindo que o backend apenas inicie sua conexão e migrações quando o MySQL estiver 100% íntegro e pronto para receber requisições.
  - *Multi-stage Builds:* Otimização extrema na geração de imagens Docker, separando os SDKs de compilação dos runtimes de produção enxutos.
  - *CI Pipeline:* Automação via GitHub Actions para validar a integridade do *build* dos containers a cada novo push/PR.

## ⚙️ Pré-requisitos

Graças à arquitetura baseada em containers, você **não precisa** ter o .NET, Node.js ou MySQL instalados na sua máquina. Você precisará apenas de:

1. **Git** (para clonar o repositório).
2. **Docker Desktop** (ou Docker Engine com a extensão Docker Compose instalada e rodando).

---

## Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone [https://github.com/VncS1/docker-crud-dotnet-react](https://github.com/VncS1/docker-crud-dotnet-react)
cd docker-crud-dotnet-react
```

### 2. Iniciar os Containers (Orquestração Total)
Na raiz do projeto (onde está o arquivo `docker-compose.yml`), abra o terminal e execute:

```bash
docker compose up --build
```

### 3. Seeder
Um seeder é rodado automaticamente para popular o banco de dados para testes.

### 4. Acessar a Aplicação
Quando os logs estabilizarem no terminal, o sistema estará pronto para uso:

- **Frontend (Interface):** [http://localhost:5173](http://localhost:5173)
- **Backend (Swagger API):** [http://localhost:5062/swagger](http://localhost:5062/swagger)
- **Banco de Dados (MySQL):** Rodando na porta `3306` mapeada para o seu localhost (Usuário: `root` / Senha: *vazia*).

---

## Autor
Vinicius Machioni