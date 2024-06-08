import express from 'express';
const morgan = require("morgan");
import serviceRouter  from '@/routes/service';
import { envs } from './config/env';
const app = express();

const { PORT, DEFAULT_API_PREFIX, HOSTNAME, BODY_SIZE_LIMIT } = envs;
app.use(morgan("combined"))
app.use(express.json({ limit: BODY_SIZE_LIMIT }));

app.use(`${DEFAULT_API_PREFIX}`, serviceRouter);
app.listen(PORT || 8000, HOSTNAME || '127.0.0.1', () => console.log("MS-SERVICIOS-DB STARTED"));