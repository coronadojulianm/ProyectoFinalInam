import { Router } from "express";

import { listarElementos, registrarElemento, eliminarElemento, actualizarElemento, consultarElemento } from '../controllers/elementos.controller.js';

const route = Router();

route.get('/listar',listarElementos);
route.post('/registrar',registrarElemento);
route.delete('/eliminar/:id',eliminarElemento);
route.put('/actualizar/:id',actualizarElemento);
route.get('/consultar/:id',consultarElemento);

export default route;