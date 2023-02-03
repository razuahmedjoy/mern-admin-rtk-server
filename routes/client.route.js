import express from 'express';
const router = express.Router();

import {getProducts} from "../controllers/client.controller.js";

router.get("/products",getProducts)

export default router;