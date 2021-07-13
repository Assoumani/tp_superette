const express = require('express'),
    productController = require('../controllers/product')

module.exports = (app) => {
    const commonProductsRoutes = express.Router();
    const webAppProductsRoutes = express.Router();

    commonProductsRoutes.get('/products', productController.getAll);
    commonProductsRoutes.get('/products/:id', productController.getById);

    webAppProductsRoutes.get('/products/new', productController.new);
    commonProductsRoutes.post('/products/create', productController.new);

    commonProductsRoutes.get('/products/:id/edit', productController.edit);
    commonProductsRoutes.post('/products/:id/update', productController.edit);

    commonProductsRoutes.get('/products/:id/delete', productController.deleteById);

    app.use('/', commonProductsRoutes)
    app.use('/', webAppProductsRoutes)
    app.use('/api/v1', commonProductsRoutes)
}

