# Desafio Toro Backend
### Aplicação feita em nodejs + express para resolução das users stories escolhidas.

### Features

TORO-001 - Eu, como investidor, gostaria de acessar a plataforma Toro usando minhas credenciais de usuário e senha, para que eu possa aprender mais, investir mais e acompanhar meus investimentos. 

TORO-003 - Eu, como investidor, gostaria de poder depositar um valor na minha conta Toro, através de PiX ou TED bancária, para que eu possa realizar investimentos.
Sugestão de implementação para TORO-003:
Backend:
Trazer pronto as seguintes APIs.

POST /spb/events

```jsonc 
POST <apiBaseUrl>/spb/events

{
   "event": "TRANSFER",
   "target": {
       "bank": "352", // Banco Toro
       "branch": "0001", // Única agenda, sempre 0001
       "account": "300123", // Conta do usuário na Toro (unica por usuário)
   },
   "origin": {
       "bank": "033", // Banco de origem 
       "branch": "03312", // Agencia de origem
       "cpf": "45358996060" // CPF do remetente
   },
   "amount": 1000, // R$ 1000,00 reais
}
```
- Outra restrição é que a origem da transferência deve sempre ser do mesmo CPF do usuário na Toro.

Para rodar a aplicação basta instalar as dependências utilizadas no projeto (npm ou yarn):
```sh
npm install 
```
Ou, caso utilize yarn:
```sh
yarn 
```
Após esse comando, e necessario a criacao de um database local ou url que aponte pra um banco remoto, para isso, altere a variavel de ambiente localizada na raiz do projeto, semelhante a vista abaixo (.env)
```text
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Para rodar a aplicacao, basta rodar o seguinte comando
```sh
yarn dev
```

A porta default será a 3333.

Para ver as relacoes e tuplas em uma interface grafica, basta rodar
```sh
yarn prisma studio
```

Para rodar os testes:
```sh
yarn test
```

## License
MIT



