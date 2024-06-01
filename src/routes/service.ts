import { ErrorBody } from '@/types/ErrorBody';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import express from 'express';
import { matches } from '@/utils';
import { Service, serviceMatcher } from '../types/Service';
import { db } from '@/db';
import { serviceModel } from '@/db/schemas';
import { eq, inArray } from 'drizzle-orm';
import { getService } from '@/db/utils';
const router = express.Router();

//* Index
router.get(
    "/",
    async (req, res) => {
        const services: Service[] = (await db
            .select()
            .from(serviceModel)
            ).map(service => {
                const newService: any = { ...service };
                newService.images = service.images.split(",");
                return <Service>newService;
            });
        
        if (Array.isArray(services)) {
            res.status(200).send(services);
        } else {
            const CODE = 500;
            const error: ErrorBody = {
                private: "La lista de servicios no pasa el typecheck de array en Index",
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

        const service: Service = await getService(db, serviceModel, +id);
        
        console.log(service)
        console.log(id)
        res.status(200).send(service);
    }
);

//* ShowList
router.get(
    "/list/:ids",
    async (req, res) => {
        const { ids } = req.body;

        const services: Service[] = (await db
            .select()
            .from(serviceModel)
            .where(inArray(serviceModel.id, ids.split(",")))
            ).map(service => {
                const newService: any = { ...service };
                newService.images = service.images.split(",");
                return <Service>newService;
            });
            
        res.status(200).send(services);
    }
);

//* Store
router.post(
    "/",
    async (req, res) => {

        const service = req.body;
        console.table(service);

        if (!matches(service, serviceMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "La forma del cuerpo no corresponde al Servicio",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no corresponde al Servicio"
                    }
                )
            }
            console.table(service);
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        console.table(service);

        const insertedService = (await db.insert(serviceModel).values(service).returning())[0];


        if (!insertedService) {
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

        res.status(200).send(insertedService);
    }
)

//* Update
router.put(
    "/:id",
    async (req, res) => {
        const { id } = req.params;
        const service = req.body;

        if (!matches(service, serviceMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "La forma del cuerpo no corresponde al Servicio",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no corresponde al Servicio"
                    }
                )
            }
            console.table(service);
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        console.table(service);

        service.images = service.images.join(",");

        const updatedService: any = (await db
            .update(serviceModel)
            .set(service)
            .where(eq(serviceModel.id, +id))
            .returning())[0];

        if (!updatedService) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Actualización no retorna fila actualizada",
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

        updatedService.images = updatedService.images.split(",");
        res.status(200).send(<Service>updatedService);
    }
)

//* Delete
router.delete(
    "/:id",
    async (req, res) => {
        const { id } = req.params;

        const deletedService: any = (await db
            .delete(serviceModel)
            .where(eq(serviceModel.id, +id))
            .returning())[0];


        if (!deletedService) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Eliminación no retorna fila eliminada",
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

        deletedService.images = deletedService.images.split(",");

        res.status(200).send(<Service>deletedService);
    }
)

export default router;