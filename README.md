### :green_book: Via Notes Backend

Repositório criado com o propósito de mostrar minhas capacidades como desenvolvedor full-stack, utilizando o **[Node](https://nodejs.org/en/)** para a criação da API.

### :wrench: Como configurar o projeto

- Instale o **[Node](https://nodejs.org/en/download/)** na sua máquina e verifique a instalação pelo comando abaixo:
```
~ node --version
```

- Clone o repositório na sua máquina:
```
~ git clone https://github.com/NEVI0/via-notes-backend.git
```

- Instale o **[Yarn](https://classic.yarnpkg.com/en/docs/install/)** como gerenciador de pacotes ou utilize o **NPM**. Verifique a instalação pelo comando abaixo:
```
~ npm --version

ou

~ yarn --version
```

- Na raíz do projeto `/via-notes-backend`, instale as dependências necessárias pelo comando abaixo:
```
~ npm install

ou

~ yarn install
```

### :file_folder: Como configurar o banco de dados localmente

- Instale o **[MySQL](https://www.mysql.com/downloads/)** na sua máquina e o configure de acordo com a sua necessidade;

- Conecte no seu banco de dados local e execute as **queries** contidas no arquivo `/via-notes-backend/db_via_notes.sql` para criar o banco de dados e as tabelas;

- Na raíz do projeto `/via-notes-backend`, crie um arquivo chamado `.env` e cole o código abaixo:
```
# Substitua as informações de acordo com o seu banco de dados 

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123
DB_NAME=db_via_notes
DB_PORT=3306

AUTH_SECRET=<STRING_ALEATORIA>
```

- Substitua as informações de autenticação pelas a do seu banco de dados;

### :zap: Como rodar o projeto

- Comando para rodar em **modo de desenvolvimento**:
```
~ npm start

ou

~ yarn start
```

- Comando para gerar o **build de produção**:
```
~ npm run build

ou

~ yarn build
```

### :page_with_curl: Informações

- Desenvolvimento:
	- **Linguagem:** Typescript;
	- **Banco de Dados:** MySQL;
	- **Linter:** ESLint;

- Produção:
	- **Servidor:** Heroku;
	- **Banco de Dados:** AWS RDS;

:copyright: *Névio Costa Magagnin*
