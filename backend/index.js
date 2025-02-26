const express = require('express')
const cors = require('cors')
const productsRoutes = require('./routes/products.routes')
const customersRoutes = require('./routes/customers.routes')
const invoiceRoutes = require('./routes/invoice.routes')

// Importar sequelize y modelos
const sequelize = require('./config/db');

// Importar modelos (esto es necesario para que Sequelize los registre)
require('./models/customer.model');
require('./models/product.model');
require('./models/invoice.model');
require('./models/invoicedetail.model');

// Importar y ejecutar relaciones
require('./models/relations'); // 🔥 Aquí se definen las relaciones

const app = express();

// Middlewares
app.use(express.json()); // Para recibir JSON en las peticiones
app.use(cors()); // Habilitar CORS

// Routes
app.use(productsRoutes);
app.use(customersRoutes);
app.use(invoiceRoutes);

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync({ force: false }) // `force: false` evita que se borren las tablas cada vez que se inicia el servidor
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(2200, () => {
            console.log('Server running on port 2200');
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });