
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const user = require('./routes/user');
const auth = require('./routes/auth');
const login = require('./routes/login');
var cors = require('cors')

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined..!');
    process.exit(1);
}
const app = express();

mongoose.connect('mongodb://localhost/users')
.then(() => console.log('connected MongoDB..!!'))
.catch(err => console.error('Could not connect mongoDB..!', err));
app.use(cors());
app.use(express.json());
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/login', login);







const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The Listing Port On ${port}..!`));