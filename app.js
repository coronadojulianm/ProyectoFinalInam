import express from 'express';
import usuarioRouter from './src/routers/usuarios.router.js';
import bodyParser from "body-parser";


import novedad from './src/routers/novedades.router.js';
import elemento from "./src/routers/elementos.router.js";
import inventario from "./src/routers/inventario.router.js";
import sitio from "./src/routers/sitios.router.js";
import prestamo from "./src/routers/prestamos.router.js"


const app = express();
const PORT = 3000;

app.use(express.json());

//configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//rutas
app.use('/novedad',novedad);
app.use(usuarioRouter);
app.use('/elemento', elemento);
app.use('/inventario', inventario);
app.use('/sitio', sitio);
app.use('/prestamo', prestamo);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});