# Jitterbit Orders API

API RESTful para gerenciamento de pedidos, desenvolvida em Node.js com Express e MongoDB.

## Tecnologias

- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticação)
- dotenv

## Instalação

```bash
npm install
cp .env.example .env
```

Edite o `.env` com suas configurações:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jitterbit_orders
JWT_SECRET=sua_chave_secreta
```

```bash
npm run dev
```

## Autenticação

Todas as rotas são protegidas por JWT. Gere um token antes de usar os endpoints:

```bash
POST /auth/token
Body: { "username": "admin", "password": "admin123" }
```

Use o token retornado no header de todas as requisições:
```
Authorization: Bearer SEU_TOKEN
```

## Endpoints

### Criar pedido
```
POST /order
```
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

### Buscar pedido
```
GET /order/:orderId
```

### Listar todos os pedidos
```
GET /order/list
```

### Atualizar pedido
```
PUT /order/:orderId
```

### Deletar pedido
```
DELETE /order/:orderId
```

## Mapeamento de campos

| Entrada        | Banco de dados |
|----------------|----------------|
| numeroPedido   | orderId        |
| valorTotal     | value          |
| dataCriacao    | creationDate   |
| idItem         | productId      |
| quantidadeItem | quantity       |
| valorItem      | price          |
