import express from 'express';
import initialize from './app.js';
import cookieParser from 'cookie-parser';
import sequelize from './db-connection.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); // check for config
app.use(cookieParser());
app.use(express.json());

sequelize.sync();

const port = 3000;
initialize(app);

app.listen(port, () => console.log(`Server listening at port ${port}`));