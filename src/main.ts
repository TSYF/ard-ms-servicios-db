import express from 'express';
const morgan = require("morgan");
import serviceRouter  from '@/routes/service';
import { envs } from './config/env';
const app = express();

app.use(morgan("combined"))
app.use(express.json());
const { PORT, DEFAULT_API_PREFIX } = envs;

app.use(`${DEFAULT_API_PREFIX}`, serviceRouter);
app.listen(PORT || 8000, () => console.log("MS-SERVICIOS-DB STARTED"));