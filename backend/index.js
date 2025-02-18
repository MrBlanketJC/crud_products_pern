const express = require('express')
const cors = require('cors')
const productsRoutes = require('./routes/products.routes')
const customersRoutes = require('./routes/customers.routes')


const app = express();

// Middlewares
app.use(express.json()); // Para recibir JSON en las peticiones
app.use(cors()); // Habilitar CORS

// Routes
app.use(productsRoutes);
app.use(customersRoutes);

app.listen(2200)
console.log('Server tun on 2200')