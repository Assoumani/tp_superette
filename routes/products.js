const express = require('express'),
    JWTGuard = require('../config/passport').checkIsAuth,
    productController = require('../controllers/product');

module.exports = (app) => {
    const commonProductsRoutes = express.Router();
    const webAppProductsRoutes = express.Router();

    commonProductsRoutes.get('/products', JWTGuard, productController.getAll);
    commonProductsRoutes.get('/products/:id', JWTGuard, productController.getById);

    webAppProductsRoutes.get('/products/new', JWTGuard, productController.new);
    commonProductsRoutes.post('/products/create', JWTGuard, productController.new);

    commonProductsRoutes.get('/products/:id/edit', JWTGuard, productController.edit);
    commonProductsRoutes.post('/products/:id/update', JWTGuard, productController.edit);

    commonProductsRoutes.get('/products/:id/delete', JWTGuard, productController.deleteById);

    app.use('/', commonProductsRoutes)
    app.use('/', webAppProductsRoutes)
    app.use('/api/v1', commonProductsRoutes)
}

