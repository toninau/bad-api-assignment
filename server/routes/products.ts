import express from 'express';
import productService from '../services/productService';

const productTypes = ['beanies', 'gloves', 'facemasks'];
const router = express.Router();

router.get('/:type', (request, response) => {
  const type = request.params.type;
  if (productTypes.includes(type)) {
    return response.send(productService.getProducts(type));
  }
  return response.status(400).json({ error: 'Invalid product type (beanies, gloves, facemasks)'});
});

export default router;