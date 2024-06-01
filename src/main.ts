import express from 'express';
const morgan = require("morgan");
import serviceRouter  from '@/routes/service';
import { envs } from './config/env';
const app = express();

app.use(morgan("combined"))
app.use(express.json());
const { PORT, DEFAULT_API_PREFIX, HOSTNAME } = envs;

app.use(`${DEFAULT_API_PREFIX}`, serviceRouter);
app.listen(PORT || 8000, HOSTNAME || '127.0.0.1', () => console.log("MS-SERVICIOS-DB STARTED"));