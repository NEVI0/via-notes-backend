### :green_book: Via Notes Backend

Repositório criado com o propósito de mostrar minhas capacidades como desenvolvedor full-stack, utilizando o **[Node](https://nodejs.org/en/)** para a criação da API.

Você pode acessar o projeto clicando **[aqui!](https://main.d7wwexdxzj8w.amplifyapp.com/)**

### :scroll: Informações do projeto backend

Projeto criado através do comando `yarn init` utilizando o **[Yarn](https://classic.yarnpkg.com/en/docs/install/)** como gerenciador de pacotes. Toda a parte de codificação está dentro da pasta `/via-notes-frontend/src`, contendo:

- :hammer_and_wrench: **[config](https://github.com/NEVI0/via-notes-backend/tree/main/src/config)**
- :vertical_traffic_light: **[controllers](https://github.com/NEVI0/via-notes-backend/tree/main/src/controllers)**
- :satellite: **[models](https://github.com/NEVI0/via-notes-backend/tree/main/src/models)**
- :bulb: **[utils](https://github.com/NEVI0/via-notes-backend/tree/main/src/utils)**

Todos os arquivos na raíz do projeto `/via-notes-backend` são arquivos de configuração. O código inicia no arquivo **[/via-notes-backend/src/index.ts](https://github.com/NEVI0/via-notes-backend/blob/main/src/index.ts)** onde as **[configurações do servidor](https://github.com/NEVI0/via-notes-backend/blob/main/src/config/server.ts)** juntamente com as **[rotas da aplicação](https://github.com/NEVI0/via-notes-backend/blob/main/src/config/routes.ts)** são importadas e iniciadas.

Cada rota executa um **controller** de sua respectiva funcionalidade, um exemplo são as rotas de **/note**, onde cada rota com um método diferente executa a sua ação **(listagem de dados, criação, atualização e remoção)**.

As rotas de **/open-api** são rotas abertas na qual qualquer requisição é aceita. Já as rotas de **/api** são bloqueadas propositalmente como uma forma de autenticar o usuário. 

As rotas bloqueadas esperam receber um token por header `{ "Authorization": "<TOKEN>" }` na qual será verificado se é um token válido ou não. Para fazer isso, foi utilizado a dependência **[Json Web Token](https://www.npmjs.com/package/jsonwebtoken)**.

Os **[models](https://github.com/NEVI0/via-notes-backend/tree/main/src/models)** são responsáveis por conectar e executar as **queries** no banco de dados. Sempre que um model é instânciado, o banco de dados é conectado e atribuido a property do model chamada de **conn (objeto de conexão)**.

Ao fim, depois que todas as queries são tratadas e executadas, é fechado a conexão com o banco de dados através do método **endConnection(hadSuccess)**, onde o parametro **hadSuccess** verifica se todas as queries foram executadas com sucesso ou não.

Foi utilizado o **[Heroku](https://www.heroku.com/)** como host para o backend e uma instância do **[AWS RDS](https://aws.amazon.com/pt/rds/)** como banco de dados.

### :hammer_and_wrench: Como configurar o projeto

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

:copyright: *Névio Costa Magagnin*
