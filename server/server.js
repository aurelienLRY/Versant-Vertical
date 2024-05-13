require('dotenv').config();
const express = require('express');
const dbConnection = require('./database/connection')
const autorisation = require('./middleware/validate/tokenValidation');
const {errorHandler}  = require('./middleware/errorHandler');

const cors = require('cors'); // permet de gérer les requêtes entre le front et le back

/**
 * ROUTER
 */
const activityRouter = require('./routes/activityRouter');
const spotRouter = require('./routes/spotRouter');
const sessionRouter = require('./routes/sessionRouter');
const customerSessionRouter = require('./routes/customerSessionRoutes');

const dotenv = require('dotenv');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

dotenv.config();

const app = express();
app.use(cors(process.env.CORS_ORIGIN));
app.use(express.json());

//connection à la base de donnée
(async () => {
    await dbConnection();
  })();

app.use('/activities', activityRouter);
app.use('/spots', spotRouter);
app.use('/sessions', sessionRouter);
app.use('/customerSessions', customerSessionRouter);
app.post('/login', authController.login);//



app.post('/user', userController.createUser);








app.use(errorHandler);//middleware pour gérer les erreurs



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));