# Trybe Futebol Club

Esta aplicação foi um dos projetos avaliativos do módulo de backend no curso de desenvolvimento web na Trybe. Nele recebi um frontend react pronto que exibe informações sobre partidas e classificações de futebol.

"E de onde essas informações virão?", você deve estar se perguntando. Vem tudo do Backend!

Exatamente, minha missão nesse projeto foi, a partir de um frontend sem lógica (apenas exibe informações), desenvolver uma API na arquitetura MSC e utilizando princípios SOLID com TypeScript e OOP que seria responsável por:

- Criar e manipular um banco de dados MySQL para armazenar todos os dados;
- Autenticar usuários cadastrados através do login;
- Listar clubes cadastrados;
- Listar partidas em andamento e partidas finalizadas;
- Adicionar partidas em andamento;
- Atualizar o placar das partidas em andamento;
- Finalizar partidas;
- Gerar leaderboards ranqueadas e ordenadas baseadas no desempenho dos clubes nas partidas cadastradas, utilizando 5 critérios avaliativos e separando em 3 tipos de classificação (geral, mandante e visitante);
- Orquestrar tudo isso (banco de dados, backend e frontend) em containers `Docker` e executá-los de forma conjunta através de uma orquestração com `Docker-Compose`.

Achou que era só isso? Sabe de nada, inocente! Já dizia o ditado, "aplicação sem testes é aplicação sem futuro", e por isso desenvolvi em TDD uma cobertura de testes de 100% em todas as camadas utilizando Mocha, Chai e Sinon.

A aplicação pode ser acessada [aqui](http://ec2-54-233-176-138.sa-east-1.compute.amazonaws.com:3000/leaderboard).

A API pode ser acessada pela porta `3001`, e a documentação com todos os endpoints pode ser acessada pela rota [`/docs`](http://ec2-54-233-176-138.sa-east-1.compute.amazonaws.com:3001/docs/)

Ps: Caso seu navegador tente acessar a página através do protocolo HTTPS e acuse erro, será necessário alterar manualmente a URL para o protocolo HTTP.

Ps2: Para realizar o login na aplicação basta usar as seguintes credenciais:

    login: admin@admin.com
    senha: secret_admin 

## Stacks utilizadas

- Node.js
- TypeScript
- Object-Oriented Programming
- Express
- MySQL
- Sequelize
- Docker
- Mocha + Chai + Sinon
- AWS
- Swagger

#### Além das Stacks citadas acima, também foram utilizadas as seguintes bibliotecas:

- `Joi` para fazer a validação do corpo das requisições;
- `JWT` para fazer a autenticação dos usuários logados;
- `bcrypt` para fazer hashing e verificação das senhas armazenadas no banco de dados.

## Rodando localmente

***Para rodar a API localmente certifique-se de ter [Docker](https://docs.docker.com/get-docker/) 
e [Docker-Compose](https://docs.docker.com/compose/install/) instalados em sua maquina.***

Obs: Docker e Docker-Compose utilizados no desenvolvimento e execução deste projeto estavam nas versões `20.10.13` e `1.29.2` respectivamente.

Clone o projeto

```bash
  git clone git@github.com:GabrielGaspar447/Trybe-Futebol-Clube.git
```

Entre no diretório do projeto

```bash
  cd Trybe-Futebol-Clube
```

Suba a orquestração de containers

```bash
  docker-compose up --build -d
```

A API estará pronta para uso quando a saída no seu terminal ficar assim

```bash
  Creating tfc_database ... done
  Creating tfc_backend ... done
  Creating tfc_frontend ... done
```

A aplicação poderá ser acessada através de

```bash
  Front-end: localhost:3000
  Back-end: localhost:3001
```

Para rodar a bateria de testes basta executar

```bash
  docker-compose exec backend npm test
```

Para encerrar a API basta executar o comando

```bash
  docker-compose down --rmi all --volumes --remove-orphans
```

## Experiência

Embora parecesse simples no começo, esse projeto se mostrou um desafio muito interessante e engrandecedor. Foi minha primeira vez desenvolvendo uma API utilizando a "programação orientada a objetos" e, embora tenha levado um tempinho até me acostumar, tenho que admitir que curti o negócio, facilitou bastante a refatoração e implementação de princípios SOLID.

O primeiro passo foi preparar toda a parte de banco de dados, pra isso adicionei um container MySQL no Docker-Compose e parti pra fazer a preparação do Sequelize. Aqui o bicho pegou, usei muito sequelize no JavaScript e nunca tive problemas mas essa foi minha primeira vez usando ele no TypeScript, e se mostrou bem mais complicado do que eu imaginava, estou até agora pensando se valeu a pena o esforço ou se era melhor trocar pra Prisma (outro ORM que tenho familiaridade), no fim insisti no Sequelize pela experiência que me proporcionaria. Depois de quase 2 horas e um mix de TS + JS consegui fazer funcionar do jeito que eu queria, agora era preparar a API em si com Express.

Como era um estilo de desenvolvimento que não estava acostumado, decidi não fugir do básico e usei o bom e velho TDD pra garantir que meus endpoints estavam funcionando como esperado após desenvolvê-los. Fiz todo o setup do Express e as camadas da arquitetura MSC (Model, Service, Controller) com classes, mas pra ser honesto não acho que fez muito sentido usar classes no Express, deixou ele mais complexo sem nenhum benefício aparente.

Pra fazer esse projeto, recebi do curso instruções dizendo os endpoints que precisaria desenvolver e o que eles deveriam retornar, o problema foi que rapidamente percebi que essas instruções estavam pouco claras e bastante imprecisas, o que me levou a abandonar as instruções em pouco tempo e seguir a verdadeira "fonte da verdade", o frontend. Tendo uma experiência razoável com React (mas meu ❤️ mora no Backend 😅) decidi que iria analisar o código do frontend. Gastei um bom tempo analisando, testando e fazendo anotações e diagramas no papel até ter um entendimento completo do que o frontend realmente esperava receber e quais endpoints ele consultava.

Análise feita e planejamento atualizado, voltei ao backend pra continuar o desenvolvimento. Tendo toda a informação necessária na mão não demorou muito pra deixar a API completamente funcional, mas ainda não estava satisfeito com o resultado. Embora tivesse tomado o cuidado pra não deixar mais de uma responsabilidade em um mesmo método/classe, percebi que minha API acabou ficando extremamente acoplada. Sabe o que isso significa? Hora de refatorar!

Já vou deixar aqui a dica de ouro, testes, MUITOS TESTES. Não existe nada que facilite mais uma refatoração do que precisar rodar apenas um `npm test` pra garantir que não fez besteira e quebrou tudo.

Logo de cara percebi duas coisas, minha camada de controller fazia pouca coisa e minha camada de service fazia muita. A solução pra isso foi até que simples, integrei minha camada de controller aos meus arquivos de rotas e criei uma nova camada (repository) pra ficar responsável por fazer as consultas ao MySQL através do Sequelize (originalmente ficavam a cargo da camada service). Resolvido essa parte mais simples, vamos pra parte mais complicada, deixar as classes o máximo possível desacopladas.

Pra resolver esse problema de acoplamento optei por usar "factory method pattern" aplicando uma injeção de dependências através de funções (fábricas) que instanciam as classes injetando todas as dependências necessárias para cada grupo de endpoints. Agora, ao invés das classes usarem diretamente suas dependências, elas apenas esperam recebê-las através de argumentos que respeitem os contratos pré-estabelecidos (interfaces). Fiquei na dúvida se deveria fazer a injeção do Sequelize nos repositories mas, como eles são responsáveis apenas por executar as operações no banco de dados, decidi manter esse acoplamento e, caso exista a necessidade de trocar o ORM no futuro, fazer a refatoração quando esse momento chegar.

No fim gostei do resultado, embora possa ser considerado um projeto simples, foi um projeto que apliquei a maioria das stacks, padrões e princípios mais importantes para desenvolver um código de qualidade. Lógico que tem como melhorar (sempre tem), no futuro pretendo expandir o projeto com mais funcionalidades, mas antes disso quero alterar algumas coisas que me incomodaram no frontend entregue originalmente pela Trybe. Quem sabe um dia esse projeto de avaliação não se torne uma aplicação de verdade? Só o tempo vai dizer 😁.
