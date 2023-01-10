const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');

const app = express();

app.use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

/**
 * post=> inserir um dado
 * get => buscar um dado
 * put => alterar um dado
 * delete => remover um dado
 */

/**
 * body => sempre que eu quiser enviar dados para a minha aplicação
 * params => /products/122353465
 * query => /products?id=123133423&value=1434345657657
 */

app.post('/products', (request, response) => {
  //name and price
  const { name, price } = request.body;

  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);

  productFile();

  return response.json(product);
});

app.get('/products', (request, response) => {
  return response.json(products);
});

app.get('/products/:id', (request, response) => {
  const { id } = request.params;
  const product = products.find(product => product.id === id);
  return response.json(product);
});

app.put('/products/:id', (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;
  const productIndex = products.findIndex(product => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  productFile();

  return response.json({ messagem: 'Produto alterado com sucesso.' });
});

app.delete('/products/:id', (request, response) => {
  const { id } = request.params;

  const productIndex = products.findIndex(product => product.id === id);

  products.splice(productIndex, 1);

  productFile();

  return response.json({ messagem: 'Produto removido com Sucesso.' });
});

function productFile() {
  fs.writeFile('products.json', JSON.stringify(products), err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Arquivo Alterado');
      git;
    }
  });
}

app.listen(9998, () => {
  console.log('Servidor rodando na porta 9998');
});
