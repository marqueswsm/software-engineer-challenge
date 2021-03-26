![PicPay](https://user-images.githubusercontent.com/1765696/26998603-711fcf30-4d5c-11e7-9281-0d9eb20337ad.png)

# Teste Backend

O desafio é criar uma API REST que busca usuarios pelo nome e username a partir de uma palavra chave. Faça o download do arquivo [users.csv.gz](https://s3.amazonaws.com/careers-picpay/users.csv.gz) que contém o banco de dados que deve ser usado na busca. Ele contém os IDs, nomes e usernames dos usuários.

###### Exemplo
| ID                                   | Nome              | Username             |
|--------------------------------------|-------------------|----------------------|
| 065d8403-8a8f-484d-b602-9138ff7dedcf | Wadson marcia     | wadson.marcia        |
| 5761be9e-3e27-4be8-87bc-5455db08408  | Kylton Saura      | kylton.saura         |
| ef735189-105d-4784-8e2d-c8abb07e72d3 | Edmundo Cassemiro | edmundo.cassemiro    |
| aaa40f4e-da26-42ee-b707-cb81e00610d5 | Raimundira M      | raimundiram          |
| 51ba0961-8d5b-47be-bcb4-54633a567a99 | Pricila Kilder    | pricilakilderitaliani|



Também são fornecidas duas listas de usuários que devem ser utilizadas para priorizar os resultados da busca. A lista 1 tem mais prioridade que a lista 2. Ou seja, se dois usuarios casam com os criterios de busca, aquele que está na lista 1 deverá ser exibido primeiro em relação àquele que está na lista 2. Os que não estão em nenhuma das listas são exibidos em seguida.

As listas podem ser encontradas na raiz deste repositório ([lista_relevancia_1.txt](lista_relevancia_1.txt) e [lista_relevancia_2.txt](lista_relevancia_2.txt)).
Os resultados devem ser retornados paginados de 15 em 15 registros.

Utilize ***Docker*** e escolha as tecnologias que você vai usar e tente montar uma solução completa para rodar a aplicação.

Faça um ***Fork*** deste repositório e abra um ***Pull Request***, **com seu nome na descrição**, para participar. 

-----

### Diferenciais

- Criar uma solução de autenticação entre o frontend e o backend;
- Ter um desempenho elevado num conjunto de dados muito grande;
- Criar testes automatizados;
- Seja Cloud native;

### Documentação

A documentação da API foi desenvolvida com base nas especificações do Open API. Pode ser visualizada utilizando o redoc-cli. Para isso, execute a instrução abaixo no seu terminal:

```bash
npm run doc
```

Você deve receber uma mensagem como `Server started: http://127.0.0.1:8080`. Logo, basta acessar o endpoint apresentado para visualizar a documentação.

### Tecnologias

- Como linguagem de desenvolvimento foi adotado JavaScript com TypeScript.
- O Banco de dados adotato foi o Mongo DB.

### Arquitetura

Para o desenvolvimento do projeto foi utilizada a arquitetura hexagonal, onde a aplicação foi divida entre as camadas de `presentation`, `core` e `infrastructure`. A camada de apresentaçã
Para o desenvolvimento do projeto foi utilizada a arquitetura hexagonal, onde a aplicação foi divida entre as camadas de `presentation`, `core` e `infrastructure`. A camada `presentation` contempla as interfaces que receberão as requisições de serviços esternos, tais como interface HTTP ou AMQP.

Por outro lado, o camada de `core` contém os domínios da aplicação e está dividido entre `use case` e `service`. Por mim, a camada de `infrastructure` apresenta os repositórios da aplicação com os adaptadores necessários para fazer requisições para serviços externos ou para armazenamento local utilizando bancos relacionais e bancos não relacionais. Mais informações sobre a arquitetura heganal são apresentadas neste [artigo.](https://medium.com/we-are-madewithlove/hexagonal-architecture-demystified-fca986a85b20)

### Testes

Testes automatizados foram escritos a fim de verificar o correto funcionando do caso de uso desenvolvido. Para executar os testes, execute o comando abaixo:

```
npx jest
```

Os arquivos de testes são armazenados dentro das pastas nomeadas como `__tests__` e seguem a nomenclatura `*.unit.test.ts`. A estrutura abaixo apresenta a organização dos arquivos de teste:

```
├── src
│   ├── core
│   │   ├── container.ts
│   │   ├── service
│   │   │   ├── __tests__
│   │   │   │   └── user.unit.test.ts
│   │   │   └── user.ts
│   │   └── useCase
│   │       ├── __tests__
│   │       │   └── user.unit.test.ts
│   │       └── user.ts
│   ├── index.ts
│   ├── infrastructure
│   │   ├── adapter
│   │   │   ├── mongo.ts
│   │   │   └── schema
│   │   │       └── user.ts
│   │   ├── container.ts
│   │   └── repository
│   │       ├── __tests__
│   │       │   └── user.unit.test.ts
│   │       └── user.ts
│   ├── presentation
│   │   ├── container.ts
│   │   └── http
│   │       ├── controller
│   │       │   ├── __tests__
│   │       │   │   └── user.unit.test.ts
│   │       │   └── user.ts
│   │       ├── helper
│   │       │   └── pagination.ts
│   │       ├── index.ts
│   │       ├── middleware
│   │       │   ├── errorHandler.ts
│   │       │   └── validator.ts
│   │       └── schemas
│   │           ├── __tests__
│   │           │   └── user.unit.test.ts
│   │           └── user.ts
```

### Banco de Dados

O arquivo [users.csv.gz](https://s3.amazonaws.com/careers-picpay/users.csv.gz)  contém o banco de dados que deve da aplicação. Ele contém os IDs, nomes e usernames dos usuários. No entanto, a lista 1 tem mais prioridade que a lista 2. Ou seja, se dois usuarios casam com os criterios de busca, aquele que está na lista 1 deverá ser exibido primeiro em relação àquele que está na lista 2. Como isso, o banco de dados foi alterado a fim de possibilitar que cada registro possua uma prioridade para ser apresentada. Nesse contexto, o banco de dados está organizado da seguinte forma:

```
| ID                                   | Nome              | Username             | priority |
|--------------------------------------|-------------------|----------------------|----------|
| 065d8403-8a8f-484d-b602-9138ff7dedcf | Wadson marcia     | wadson.marcia        | 0        |
| 5761be9e-3e27-4be8-87bc-5455db08408  | Kylton Saura      | kylton.saura         | 0        |
| ef735189-105d-4784-8e2d-c8abb07e72d3 | Edmundo Cassemiro | edmundo.cassemiro    | 1        |
| aaa40f4e-da26-42ee-b707-cb81e00610d5 | Raimundira M      | raimundiram          | 2        |
| 51ba0961-8d5b-47be-bcb4-54633a567a99 | Pricila Kilder    | pricilakilderitaliani| 2        |
```

Com isso, prioridade 2 são os registros com maior prioridade (lista 2) e os registros com prioridade 1 são os arquivos com menor prioridade (lista 1). Os demais registros permanecem com prioridade 0.

### Testar aplicação

A fim de facilitar os testes da aplicação, foi realizado o deploy da API junto ao Heroku. Para buscar usuários, basta executar a ação abaixo:

```bash
curl --location --request GET 'https://picpay-software-engineer-test.herokuapp.com/v1/users?page=1' 
```

Espera-se um resultado como:

```json
{
    "page": 1,
    "size": 1,
    "limit": 15,
    "data": [
        {
            "_id": "afd6b396-55dd-42e5-8724-a7048fcf991d",
            "name": "Virginia Sou",
            "username": "a Preuss"
        },
        ...
    ]
}
```

### Execução local

É possível executar a aplicação localmente e recomendo fortemente a utilização de docker para executar a base de dados:

```
docker run -d --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    mongo
```

A aplicação pode ser executa através da execução:

```
npm run dev
```