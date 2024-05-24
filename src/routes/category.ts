import { client, db } from '@/db';
import { categoryModel } from '@/db/schemas';
import { Category, categoryMatcher } from '@/types/Category';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import { ErrorBody } from '@/types/ErrorBody';
import { matches } from '@/utils';
import express from 'express';
const router = express.Router();

//* Index
router.get(
    "/",
    async (req, res) => {
        const categories: Category[] = await db
            .select()
            .from(categoryModel);
        
        if (Array.isArray(categories)) {
            res.status(200).send(categories);
        } else {
            const CODE = 500;
            const error: ErrorBody = {
                private: "La lista de categorías no pasa el typecheck de array en Index",
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


//* Store
router.post(
    "/",
    async (req, res) => {

        const category = req.body;

        if (!matches(category, categoryMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no corresponde a la Categoría"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        }

        console.log(category);
        const insertedCategory = (await db.insert(categoryModel).values(category).returning())[0];

        if (!insertedCategory) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Error inesperado en inserción en Store",
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
        }

        if (matches(insertedCategory, categoryMatcher)) {
            res.status(200).send(insertedCategory);
        } else {
            const CODE = 500;
            const error: ErrorBody = {
                private: "La lista de categoryos no pasa el typecheck de array en Store",
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
)

module.exports = router;
export default router;