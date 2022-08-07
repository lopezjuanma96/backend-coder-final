//------------- IMPORTS ----------------
//server
import express from 'express'
import { Server as Io } from 'socket.io';
import { Server as Http } from 'http';

//routers
import cartRouter from "./routes/cart.js";
import chatRouter from "./routes/chat.js";
import prodRouter from "./routes/products.js";

//logger
import logger from './utils/logger.js';
//----------- END IMPORTS --------------

//------------- CONSTANTS ----------------
//server
const app = express();
const http = Http(app);
const io = Io(http);
const PORT = process.env.PORT || 8080;
//----------- END CONSTANTS --------------

//------------- SETUP ----------------
//server
app.use(express.urlencoded())
app.use(express.static('./public'))

app.use('/api/products', prodRouter)
app.use('/api/chat', chatRouter)
app.use('/api/cart', cartRouter)

http.listen(PORT, () => logger.info(`Server up in http://localhost:${PORT}`))

//----------- END SETUP --------------
