# Objetos, Dados e Assincronismo — Semana 05

Atividade de Desenvolvimento Web utilizando JavaScript, manipulação de dados, Fetch API e async/await.

## Parte 1 — Pedidos

O programa valida os pedidos, filtra os que estão pagos e calcula o total faturado utilizando `filter` e `reduce`.

## Parte 2 — Buscador de CEP

Permite pesquisar um CEP utilizando a API ViaCEP. O programa valida o CEP e mostra rua, bairro, cidade e UF.

Também apresenta mensagens de carregamento, erro e CEP não encontrado.

## Parte 3 — Mini Pokédex

Permite pesquisar um Pokémon pelo nome utilizando a PokéAPI.

Mostra o nome, a imagem e os tipos do Pokémon, além de tratar erros e pesquisas sem resultado.

## Parte 4 — Reflexão

**Por que `Promise.all` pode ser mais rápido que vários `await` seguidos?**

Porque vários `await` em sequência podem esperar uma requisição terminar antes de iniciar a próxima. Já o `Promise.all` permite executar várias requisições ao mesmo tempo e aguardar todas terminarem, aproveitando melhor o tempo de rede.

## Como executar

Abra o arquivo `index.html` no navegador. É necessário ter conexão com a internet para consultar as APIs.