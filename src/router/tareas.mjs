import express from 'express';
const rutas = express.Router();


//otra forma de crear rutas

rutas.get('/', (req, res) => {
    res.send('Ruta de las tareas');
  });
  

export default rutas;
  