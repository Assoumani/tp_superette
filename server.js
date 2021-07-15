require('dotenv').config();
CONNECTION_STRING=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_Name}?retryWrites=true&w=majority`
const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    passport = require('passport'),
    passportConfig = require('./config/passport'),
    User = require('./models/user'),
    path = require('path');

//create app
const app = express();

//parse all body from the POST form
app.use(express.urlencoded({extended:true}))

// parse the body from the post form as json
app.use(express.json())

// prevent error policy
app.use(cors());

// use local jwt strategy for passport
passport.use(passportConfig.localStrategy)
passport.use(passportConfig.jwtStrategy)

//define the new Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// connect the DB
mongoose.connect(
    CONNECTION_STRING,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
);

// manage all routes
require('./routes/router')(app)

User
    .countDocuments()
    .exec((err, usersCount) => {
        if (err){
            return console.error(err)
        }

        if (usersCount === 0){
            new User({
                username: 'Assou',
                email: 'assoumani.mutabaruka@gmail.com',
                firstname: 'Assoumani',
                lastname: 'Mutabaruka'
            }).save()
        }
    })

app.listen(process.env.SERVER_PORT, ()=>{
    console.info(`Server is running on port ${process.env.SERVER_PORT}`)
})
