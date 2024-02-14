import { Router } from "express";
import { listarPrestamo, registrarPrestamos, eliminarPrestamos, actualizarPrestamos, consultarPrestamos } from "../controllers/prestamos.controller.js";


const router = Router();

router.get('/ListarPrestamo', listarPrestamo);
router.post('/registrarPrestamo', registrarPrestamos);
router.delete('/eliminarPrestamo/:id', eliminarPrestamos);
router.put('/actualizarPrestamo/:id', actualizarPrestamos);
router.get('/consultarPrestamo/:id', consultarPrestamos);

export default router;
