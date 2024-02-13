import { Router } from "express";

import { listarInventario, registrarInventario, eliminarInventario, actualizarInventario, consultarInventario } from "../controllers/inventario.controller.js";

const route = Router();

route.get('/listar',listarInventario);
route.post('/registrar',registrarInventario);
route.delete('/eliminar/:id',eliminarInventario);
route.put('/actualizar/:id',actualizarInventario);
route.get('/consultar/:id',consultarInventario);

export default route;