import { CommonResponseBody } from '@/types/CommonResponseBody';
import swaggerAutogen from 'swagger-autogen';

const CommonResponse = new CommonResponseBody(
  true,
  200,
  {}
);
const doc = {
  info: {
    title: 'Productos',
    description: 'API de Productos para AR Repuestos'
  },
  host: 'localhost:8000',
  components: {
    schemas: {
      CommonResponse
    }
  }
};

const outputFile = '../../openapi-contract.json';
const routes = ['../routes/product.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: "3.0.3"})(outputFile, routes, doc).then(() => {
  require('../main'); // Your project's root file
});