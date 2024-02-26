// server.mjs
// import express from 'express' y 
// http from 'http' son los modulos que se van a usar
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import tareasRouter from './router/tareas.mjs';
const path = require('path');
import multer from 'multer';

// crea el servidor
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/tareas', tareasRouter);


const upload = multer({ dest: 'uploads/' });
app.use(upload.single('archivo'));
const uploadimg = multer({ dest: path.join(__dirname, 'uploadimg/')});
// Ruta para subir el archivo directamente al directorio uploadimg/
app.post('/uploadimg', uploadimg.single('imagen'), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: 'No se ha enviado ningún archivo' });
  }

  return res.json({ filename: req.file.filename });
});

// usa el puerto 5000 

app.set('port', process.env.PORT || 5000);

// ruta inicial
app.get('/', (req, res) => {
  res.send('Hola soy tu servidor nuevo!');
});

// inicia el servidor en el puerto 5000

server.listen(app.get('port'), () => {
  console.log('Servidor corriendo en el puerto..', app.get('port'));
});
mongoose.connect('mongodb://localhost:27017/bbdd')
  .then(db =>  console.log('Conectado a la base de datos'))
  .catch(error =>  console.log('Error al conectar a la base de datos', error));