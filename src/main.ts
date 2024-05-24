import express from 'express';
const morgan = require("morgan");
import categoryRouter  from '@/routes/category';
import productRouter  from '@/routes/product';
const app = express();

app.use(morgan("combined"))
app.use(express.json());
const { PORT, PRODUCT_API_PREFIX, CATEGORY_API_PREFIX } = process.env;

app.use(`${CATEGORY_API_PREFIX}`, categoryRouter);
app.use(`${PRODUCT_API_PREFIX}`, productRouter);
app.listen(PORT || 8000, () => console.log("MS-PRODUCT-DB STARTED"));