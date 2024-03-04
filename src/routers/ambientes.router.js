import { Router } from "express";
import { listarAmbientes, registrarAmbiente, eliminarAmbiente, actualizarAmbiente, consultarAmbiente } from "../controllers/ambientes.controller.js";

const route = Router();

route.get('/listar',listarAmbientes);
route.post('/registrar',registrarAmbiente);
route.delete('/eliminar/:id',eliminarAmbiente);
route.put('/actualizar/:id',actualizarAmbiente);
route.get('/consultar/:id',consultarAmbiente);

export default route;