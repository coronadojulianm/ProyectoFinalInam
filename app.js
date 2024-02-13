import express from 'express';
import usuarioRouter from './src/routers/usuarios.router.js';
import bodyParser from "body-parser";


import novedad from './src/routers/novedades.router.js';




const app = express();
const PORT = 3000;

app.use(express.json());

//configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//rutas
app.use('/novedad',novedad);
app.use(usuarioRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});