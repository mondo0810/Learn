const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const productController = require('./controllers/productController');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/products', productController);

app.get('/', (req, res) => {
    res.redirect('/products');
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
