<h1 align="center">CryptoRank backend task</h1>

<p align="center">Based on <a href="https://github.com/nestjs/nest">NestJS</a> - NodeJS backend framework</p>
   
## Task

Напишите небольшое приложение на Nest.js, которое будет обрабатывать запросы на конвертацию одной валюты в другую.

Поинт:
/currency/convert/?from={string}&to={string}&amount={number}

Параметры:

from - ключ монеты из которой конвертируем
to - ключ монеты в которую конвертируем. Необязателен, По умолчанию tether
amount - количество монет которое конвертируем. Необязателен, По умолчанию 1
Пример запроса:
/currency/convert/?from=ethereum&to=bitcoin&amount=100

Пример ответа:
{ "amount": 100, "from": "ethereum", "to": "bitcoin", "result": 6.3 }

Цены криптовалют можно получить по API: https://tstapi.cryptorank.io/v0/coins/prices/
Все цены указаны в USD

## Installation

```bash
$ yarn
```

## Running the app

Before runnig you should create `.env` file as `.env.template` and add API link. Project use link from **TASK**.

```bash
# development
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test
```

## Swagger

After running you can open swagger, default it's run ot [localhost:3000/api](http://localhost:3000/api)