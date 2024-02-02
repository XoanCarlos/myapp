import express from 'express';
const rutas = express.Router();

import tarea from '../models/tarea.mjs';

//otra forma de crear rutas

rutas.get('/', async(req, res) => {
    const tareas = await tarea.find();    
    res.json(tareas);
  });

rutas.post('/', async(req, res) => {
  try {
    const nuevatarea = new tarea();
    
    nuevatarea.nombre = req.body.nombre;
    nuevatarea.descripcion = req.body.descripcion;
    nuevatarea.fecha = req.body.fecha;
    nuevatarea.prioridad = req.body.prioridad;
    
      await nuevatarea.save();
      console.log(nuevatarea);
      res.json({
        status: 'Tarea guardada'
      
    });
  } catch (error) {
  console.error('Error al guardar la tarea:', error);
  res.status(500).json({
      error: 'Error al guardar la tarea'
  });
} 
});
  
export default rutas;
  