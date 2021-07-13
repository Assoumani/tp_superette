const product = require('../models/product');

/**
 * Method used to retrieve all products
 * @param req
 * @param res
 * @param next
 */
exports.getAll = (req, res, next) => {
    let cb = (err, products) => {
        if (err) {
            console.error(err);
            return res.redirect('/errors')
        }
        return res.render('products/index', {products})
    };

    if (req.originalUrl.includes(process.env.API_PATH)) {
        cb = (err, products) => {
            if (err) {
                console.error(err);
                return res.status(404).json({err: 'Ressources introuvables'})
            }
            return res.status(200).json({products})
        }
    }
    product
        .find()
        .limit(5)
        .populate('creatorId')
        .exec(cb)
};

/**
 * Method used to retrieve one product
 * @param req
 * @param res
 * @param next
 */
exports.getById = (req, res, next) => {
    if (req.params.id === "new"
        || req.params.id === "create"
    ) {
        return next();
    }

    let cb = (err, product) => {
        if (err) {
            console.error(err)
            return res.redirect('/errors')
        }
        return res.render('products/show', {product})
    };

    if (req.originalUrl.includes(process.env.API_PATH)) {
        cb = (err, product) => {
            if (err) {
                console.error(err);
                return res.status(404).json({err: 'Ressources introuvables'})
            }
            return res.status(200).json({product})
        }
    }
    product.findById(req.params.id, null, null, cb)
};

/**
 * Method used to create an product
 * @param req
 * @param res
 * @param next
 */
exports.new = (req, res, next) => {
    let cb = (err) => {
        if (err) {
            console.error(err)
            return res.redirect('/errors')
        }
        return res.redirect('/products')
    };

    if (req.originalUrl.includes(process.env.API_PATH)) {
        cb = (err, product) => {
            if (err) {
                console.error(err);
                return res.status(404).json({err: 'Ressource introuvable'})
            }
            return res.status(200).json({product})
        }
    }
    if (req.method === 'POST') {
        req.body.createdAt = new Date();
        req.body.imageUrl = 'https://picsum.photos/id/' + Math.floor(Math.random() * 100) + '/200/300';
        new product(req.body).save(cb)

    } else {
        return res.render('products/new')
    }
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.edit = (req, res, next) => {
    let cb = (err, product) => {
        if (err) {
            console.error(err);
            return res.status(404).json({err: 'Ressource introuvable'})
        }
        return res.status(200).json({product})
    }
    if (req.method === 'POST') {
        if (!req.originalUrl.includes(process.env.API_PATH)){
            cb = (err) => {
                if (err) {
                    console.error(err)
                    return res.redirect('/errors')
                }
                res.redirect('/products')
            }
        }
        product.findByIdAndUpdate(req.params.id, req.body, null, cb)
    } else {
        if (!req.originalUrl.includes(process.env.API_PATH)){
            cb = (err, product) => {
                if (err) {
                    console.error(err)
                    return res.redirect('/errors')
                }
                return res.render('products/edit', {product: product})
            }
        }
        product.findById(req.params.id, null, null, cb)
    }
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteById = (req, res, next) => {
    let cb = (err) => {
        if (err) {
            console.error(err)
            return res.redirect('/errors')
        }
        res.redirect('/products')
    };

    if (req.originalUrl.includes(process.env.API_PATH)) {
        cb = (err, product) => {
            if (err) {
                console.error(err);
                return res.status(404).json({err: 'Ressource introuvable'})
            }
            return res.status(200).json({product})
        }
    }
    product.findByIdAndDelete(req.params.id, null, cb)
};
