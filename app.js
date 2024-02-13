import express from 'express';
import usuarioRouter from './src/routers/usuarios.router.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(usuarioRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});