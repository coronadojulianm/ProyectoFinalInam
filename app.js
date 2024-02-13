import express from "express";
import bodyParser from "body-parser";
import elementos from "./src/routers/elementos.router.js";
import inventario from "./src/routers/inventario.router.js";
import sitios from "./src/routers/sitios.router.js";

const servidor = express();

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: true }));

servidor.use('/elementos', elementos);
servidor.use('/inventario', inventario);
servidor.use('/sitios', sitios);

servidor.listen(3000, ()=> {
    console.log('Servidor en el puerto 3000');
})