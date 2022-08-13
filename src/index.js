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

//logger
import logger from './utils/logger.js';

//dao
import ChatDAO from './containers/daos/chatDAO.js';
import ChatDTO from './containers/dtos/chatDTO.js';

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

app.use('/api/products', prodRouter)
app.use('/api/chat', chatRouter)
app.use('/api/cart', cartRouter)

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
    .then((msgs) => socket.emit('chatMessages', msgs))
    .catch((err) => logger.error(err.message));
    socket.on('newChatMessageInput', (msg) => {
        chatDAO.save(new ChatDTO({
            //can w include id
            user: msg.user,
            text: msg.text,
            date: Date.now()
        }))
        .then((saved) => {
            socket.emit('newChatMessageUpdate', msg); //CHECK IF WE CAN DO THIS LIKE THIS OR RE-ASK FOR CHAT DAO FOR ALL MESSAGES
        });
    });
})
//----------- END SETUP --------------
