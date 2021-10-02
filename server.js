if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// imports
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const app = express();
const defaultRouter = require('./routes/defaultRouter');
const recipeRoute = require('./routes/api/Recipes');

// settings
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/recipe-app';
const secret = process.env.SECRET || 'secret';

// configuration
const appConfig = (function () {
    const sessionConfig = {
        name: 'session',
        secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 60 * 60 * 24,
            httpOnly: true,
            // secure: true,
        },
        store: MongoStore.create({
            mongoUrl: dbUrl,
            touchAfter: 60 * 60,
            crypto: {
                secret,
            },
        }),
    };

    app.use(session(sessionConfig));

    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
})();

const mongooseConfig = (function () {
    mongoose.set('useFindAndModify', false);

    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console.error, 'conection error:'));
    db.once('open', () => {
        console.log('Database connected');
    });
})();

// routes
app.use('/api/recipes', recipeRoute);
app.use('/', defaultRouter);

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});
