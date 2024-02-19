import express from 'express';
const rutas = express.Router();
import multer from 'multer';

import tarea from '../models/tarea.mjs';

rutas.use(express.json());
//otra forma de crear rutas
const upload = multer({ dest: 'uploads/' });

rutas.get('/', async(req, res) => {
  try{
    const tareas = await tarea.find();    
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
}
});

rutas.post('/', upload.single('archivo'), async(req, res) => {
  try {
       // Verificar si hay un archivo adjunto
    if (req.file) {
        console.log('Archivo recibido:', req.file); // Registrar información sobre el archivo recibido
      } else {
        console.log('No se recibió ningún archivo.');
      }
    const nuevatarea = new tarea(req.body);
    
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
  
rutas.put('/:id', async(req, res) => {
  try {
      await tarea.findByIdAndUpdate(req.params.id, req.body);
      res.json({
          status: 'Tarea actualizada'
      });
  } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      res.status(500).json({
          error: 'Error al actualizar la tarea'
      });
  }
});

rutas.delete('/:id', async(req, res) => {
  try {
      await tarea.findByIdAndDelete(req.params.id);
      res.json({
          status: 'Tarea eliminada'
      });
  } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      res.status(500).json({
          error: 'Error al eliminar la tarea'
      });
  }
});


rutas.get('/:id', async(req, res) => {  
  const tareas = await tarea.findById(req.params.id);    
  res.json(tareas);
});


export default rutas;
  