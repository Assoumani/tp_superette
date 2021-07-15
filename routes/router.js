require('dotenv').config();
module.exports = (app) => {

    require('./auth')(app);
    require('./products')(app);

    // define default route
    app.get('/errors', (req, res) => {
        if (req.originalUrl.includes(process.env.API_PATH)) {
            return res
                .status(404)
                .json({err: 'Ressources non trouvés'})
        }
        return res.render('errors')
    })

    app.use((req, res) => {
        return res.redirect('/products')
    })
}
