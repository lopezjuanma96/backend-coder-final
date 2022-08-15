import { getHandler } from '../controllers/chat.js'
import { Router } from 'express';
import logger from '../utils/logger.js';

const chatRouter = new Router();

chatRouter.get('/', (req, res) => {
    getHandler(req)
    .then(results => res.render('chat', results))
    .catch(err => {
        logger.error(err.message);
        res.render('error', {err})
    })
})

chatRouter.get('/api', (req, res) => {
    getHandler(req)
    .then(results => res.json(results))
    .catch(err => {
        logger.error(err.message);
        res.json({err: err.message});
    })
})

export default chatRouter;