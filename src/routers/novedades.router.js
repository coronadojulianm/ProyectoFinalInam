import { Router } from "express";
import { listarNovedad, registrarNovedad, eliminarNovedad, actualizarNovedad, consultarNovedad } from "../controllers/novedades.controller.js";

const router = Router();

router.get('/listar', listarNovedad);
router.post('/registrar', registrarNovedad);
router.delete('/eliminar/:id', eliminarNovedad);
router.put('/actualizar/:id', actualizarNovedad);
router.get('/consultar/:id', consultarNovedad)

export default router;
