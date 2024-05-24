import { envs } from '@/config/env';
import { ErrorBody } from '@/types/ErrorBody';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import express from 'express';
import { matches } from '@/utils';
import { Product, productMatcher } from '../types/Product';
import { db } from '@/db';
import { productModel } from '@/db/schemas';
import { eq, inArray } from 'drizzle-orm';
const router = express.Router();

//* Index
router.get(
    "/",
    async (req, res) => {
        const products: Product[] = await db
            .select()
            .from(productModel);
        
        if (Array.isArray(products)) {
            res.status(200).send(products);
        } else {
            const CODE = 500;
            const error: ErrorBody = {
                private: "La lista de productos no pasa el typecheck de array en Index",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            res.status(CODE).send(error.public);
        }
    }
);

//* Show
router.get(
    "/:id",
    async (req, res) => {
        const { id } = req.params;

        const products: Product[] = await db
            .select()
            .from(productModel)
            .where(eq(productModel.id, +id));
        const product = products[0];
        
        console.log(product)
        console.log(id)
        res.status(200).send(product);
    }
);

//* ShowList
router.get(
    "/list/:ids",
    async (req, res) => {
        const { ids } = req.body;

        const products: Product[] = await db
            .select()
            .from(productModel)
            .where(inArray(productModel.id, ids.split(",")));
            
        res.status(200).send(products);
    }
);

//* Store
router.post(
    "/",
    async (req, res) => {

        const product = req.body;
        console.table(product);

        if (!matches(product, productMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "La forma del cuerpo no corresponde al Producto",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no corresponde al Producto"
                    }
                )
            }
            console.table(product);
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        console.table(product);

        const insertedProduct = (await db.insert(productModel).values(product).returning())[0];


        if (!insertedProduct) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Inserción no retorna fila insertada",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        res.status(200).send(insertedProduct);
    }
)


module.exports = router;
export default router;