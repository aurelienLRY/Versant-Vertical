const express = require('express');
const dbConnection = require('./database/connection')


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const reservationController = require('./controllers/reservationController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

dotenv.config();

const app = express();
app.use(express.json());

//connection à la base de donnée
dbConnection();





function auth(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send({message: 'No token provided'});

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = payload.userId;
    next();
  } catch (e) {
    res.status(401).send({message: 'Invalid token'});
  }
}
app.post('/login', authController.login);//

app.post('/user', userController.createUser);

app.post('/reservations', auth, reservationController.createReservation);
app.get('/reservations', auth, reservationController.getAllReservations);
app.get('/reservations/:id', auth, reservationController.getOneReservation);
app.put('/reservations/:id', auth, reservationController.updateReservation);
app.delete('/reservations/:id', auth, reservationController.deleteReservation);




const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API avec Swagger',
      version: '1.0.0',
    },
  },
  apis: ['./server.js'], // chemin vers les fichiers contenant les docstrings de swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));