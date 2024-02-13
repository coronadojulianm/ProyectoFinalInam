import { Router } from "express";
import { listarSitios, registrarSitio, actualizarSitio, eliminarSitio, consultarSitio } from "../controllers/sitios.controller.js";

const route = Router();

route.get('/listar', listarSitios);
route.post('/registrar', registrarSitio);
route.put('/actualizar/:id', actualizarSitio);
route.delete('/eliminar/:id', eliminarSitio);
route.get('/consultar/:id', consultarSitio);

export default route;