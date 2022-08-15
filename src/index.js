//------------- IMPORTS ----------------
//server
import express from 'express'
import { Server as Io } from 'socket.io';
import { Server as Http } from 'http';

//views
import { engine } from 'express-handlebars';

//routers
import cartRouter from "./routes/cart.js";
import chatRouter from "./routes/chat.js";
import prodRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";

//logger
import logger from './utils/logger.js';

//dao
import ChatDAO from './containers/daos/chatDAO.js';
import ChatDTO from './containers/dtos/chatDTO.js';

import ProdDAO from './containers/daos/productsDAO.js';
import ProdDTO from './containers/dtos/productsDTO.js';

//env
import dotenv from 'dotenv';
import path from 'path';

//----------- END IMPORTS --------------

//------------- CONSTANTS ----------------
//server
const app = express();
const http = new Http(app);
const io = new Io(http);
const PORT = process.env.PORT || 8080;

const chatDAO = new ChatDAO();
const prodDAO = new ProdDAO();

//----------- END CONSTANTS --------------

//------------- SETUP ----------------
//env
dotenv.config({
    path: path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`)
})

//server
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './src/views/layouts',
    partialsDir: './src/views/partials'
}))
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('./src/public'))

app.use('/users', usersRouter)
app.use('/products', prodRouter)
app.use('/chat', chatRouter)
app.use('/cart', cartRouter)

http.listen(PORT, () => {
    if (process.env.NODE_ENV == "DEV"){
        logger.info(`Server up in http://localhost:${PORT} - ENVIRONMENT: ${process.env.NODE_ENV}`);
        logger.info(`Persistance on Products: ${process.env.PROD_CONTAINER_TYPE}`);
        logger.info(`Persistance on Cart: ${process.env.CART_CONTAINER_TYPE}`);
        logger.info(`Persistance on Chat: ${process.env.CHAT_CONTAINER_TYPE}`);
    } else {
        logger.info('Server up in http://localhost:${PORT}');
    }
})

io.on('connection', (socket) => {
    logger.info(`New user connected!`);
    chatDAO.getAll()
    .then((msgs) => socket.emit('chatMessages', msgs.map(m => m.getForDb()))) //HERE im not being able to serialize the DTO, so for what is it worth?
    .catch((err) => logger.error(err.message));
    socket.on('newChatMessageInput', (msg) => {
        chatDAO.save(new ChatDTO({
            //can w include id
            user: msg.user,
            text: msg.text,
            date: Date.now()
        }))
        .then((saved) => {
            socket.emit('newChatMessageUpdate', saved.getForDb()); //HERE im not being able to serialize the DTO, so for what is it worth?
        });
    });
    socket.on('newProductInput', (prod) => {
        prodDAO.save( new ProdDTO({
            id : prod.id,
            name : prod.name,
            price : prod.price,
            stock : prod.stock,
            thumbnail : prod.thumbnail,
            creation : Date.now(),
            lastUpdate : Date.now()
        }))
        .then((saved) => {
            socket.emit('newProductUpdate', saved.getForDb()); //HERE im not being able to serialize the DTO, so for what is it worth?
        });
    })
})
//----------- END SETUP --------------
