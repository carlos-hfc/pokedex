# Pokédex App

Este é um projeto de Pokédex que permite aos usuários explorar informações sobre Pokémons, filtrar por tipo, nome e visualizar a evolução de cada um. O aplicativo é construído com React, Tailwind CSS, Next.js e Typescript, utilizando a API do PokeAPI para obter dados detalhados sobre os Pokémons.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (normalmente vem com o Node.js)

## Configuração

1. Clone o repositório para sua máquina local:

```bash
git clone https://github.com/carlos-hfc/pokedex.git
```

2. Acesse o diretório do projeto:

```bash
cd pokedex
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env.local` na raíz do projeto e adicione a BASE_URL para pegar um Pokémon aleatório como destaque:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Executando a Aplicação

Com as dependências instaladas e a BASE_URL configurada, você pode iniciar a aplicação:

```bash
npm run dev
```

## Uso da Aplicação

1. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).
2. Explore a Pokédex, filtre-os por tipo, nome e visualize as evoluções de cada um.

## Tecnologias Utilizadas

- React
- Tailwind CSS
- Next.js
- Typescript

## API

Este projeto utiliza a [PokeAPI](https://pokeapi.co/) para obter dados detalhados sobre os Pokémons.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).