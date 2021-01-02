import express from 'express';
import productsRouter from './routes/products';
import { fetchProducts } from './utils/dataFetch';

const app = express();

const PORT = process.env.PORT || 3001;

app.use('/api/products', productsRouter);
app.use(express.static('client/build'));
//refresh product data every 5min (= 5 * 60 * 1000 = 300 000ms)
void fetchProducts();
setInterval(() => {
  void fetchProducts();
}, 300000);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});