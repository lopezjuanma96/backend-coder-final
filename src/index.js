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
import chatDAO from './containers/daos/cartDAO.js';
import chatDTO from './container/dtos/cartDTO.js';
//----------- END IMPORTS --------------

//------------- CONSTANTS ----------------
//server
const app = express();
const http = new Http(app);
const io = new Io(http);
const PORT = process.env.PORT || 8080;
//----------- END CONSTANTS --------------

//------------- SETUP ----------------
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

app.use(express.static('./public'))

app.use('/api/products', prodRouter)
app.use('/api/chat', chatRouter)
app.use('/api/cart', cartRouter)

http.listen(PORT, () => logger.info(`Server up in http://localhost:${PORT}`))

io.on('connection', (socket) => {
    logger.info(`New user connected!`);
    chatDAO.getAll()
    .then((msgs) => socket.emit('chatMessages', msgs))
    .catch((err) => logger.error(err.message));
    socket.on('newMessageInput', (msg) => {
        chatDAO.save(new chatDTO({
            //can w include id
            user: msg.user,
            text: msg.text,
            date: Date.now()
        }))
        .then((saved) => {
            socket.emit('newMessageUpdate', msg); //CHECK IF WE CAN DO THIS LIKE THIS OR RE-ASK FOR CHAT DAO FOR ALL MESSAGES
        });
    });
})
//----------- END SETUP --------------
