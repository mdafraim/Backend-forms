const mongoose = require('mongoose');
const express = require('express');
const user = require('./routes/user');
var cors = require('cors')

const app = express();
app.use(cors())
mongoose.connect('mongodb://localhost/users')
.then(() => console.log('connected MongoDB..!!'))
.catch(err => console.error('Could not connect mongoDB..!', err));

app.use(express.json());
app.use('/api/users', user);







const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The Listing Port On ${port}..!`));