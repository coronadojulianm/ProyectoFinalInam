import { Router } from "express";
import { listarAreas, registrarArea, actualizarArea, eliminarArea, consultarArea } from "../controllers/areas.controller.js";

const route = Router();

route.get('/listar', listarAreas);
route.post('/registrar', registrarArea);
route.put('/actualizar/:id', actualizarArea);
route.delete('/eliminar/:id', eliminarArea);
route.get('/consultar/:id', consultarArea);

export default route;