# Atividade - Consumo de API em React Native

Aplicacao React Native simples para consultar endereco por CEP utilizando a API publica ViaCEP e o metodo nativo `fetch`.

## API utilizada

- Link: https://viacep.com.br/
- Endpoint usado no projeto: `https://viacep.com.br/ws/{CEP}/json/`

## Como executar

1. Instale as dependencias:
   - `npm install`
2. Rode a aplicacao:
   - `npm run start`
3. Abra no emulador Android/iOS ou no app Expo Go.

## Como funciona

- O usuario digita um CEP.
- O app chama a API com `fetch`.
- A resposta JSON e convertida com `response.json()`.
- Os dados recebidos sao exibidos na tela.
- Existem validacoes para CEP invalido, CEP inexistente e erro de rede.

## Arquivo principal

- `App.js`
