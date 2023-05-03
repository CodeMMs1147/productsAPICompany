import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import products from './routes/products.routes';

const app = express();

app.set('pkg', pkg);

// este comentario viene desde gitHub
// morgan sirve para
app.use(morgan('dev'));

// eslint-disable-next-line max-len
// siempre que se vayan a envíar objetos json en algun momento al servidor se le debe decir a express que los reconozca así:
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

app.use('/products', products);

export default app;
