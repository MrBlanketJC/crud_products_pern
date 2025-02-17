const express = require('express')
const cors = require('cors')
const productsRoutes = require('./routes/products.routes')


const app = express();
app.use(express.json());
app.use(cors());
app.use(productsRoutes);

app.listen(2200)
console.log('Server tun on 2200')