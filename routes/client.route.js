import express from 'express';
const router = express.Router();

import {getCustomers, getProducts} from "../controllers/client.controller.js";

router.get("/products",getProducts)
router.get("/customers",getCustomers)

export default router;