import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';


// data imports

// import User from './models/User.js';
// import {dataUser} from './data.js';
// import Product from './models/Product.js';
// import ProductStat from './models/ProductStat.js';
// import {dataProduct,dataProductStat} from './data.js';

/**CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

import clientRoutes from './routes/client.route.js';
import generalRoutes from './routes/general.route.js';
import managementRoutes from './routes/management.route.js';
import salesRoutes from './routes/sales.route.js';

/**ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);


/**DATABASE CONNECTION */
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
//When strict option is set to true, Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database
mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

        // only add data one time
        // User.insertMany(dataUser)
        // Product.insertMany(dataProduct)
        // ProductStat.insertMany(dataProductStat)

    }).catch((e)=>console.log(e.message));