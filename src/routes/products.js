import { getHandler, postHandler, putHandler, deleteHandler } from '../controllers/products.js'
import { Router } from 'express';

import logger from '../utils/logger.js';

const prodRouter = new Router();

prodRouter.get('/', (req, res) => {
    getHandler(req, res)
    .then(result => {
        res.render('products', result);
    })
    .catch(err => {
        logger.error(err.message);   
        res.render('error', {err});
    })
})

prodRouter.get('/api', (req, res) => {
    getHandler(req, res)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.post('/api/add', (req, res) => {
    postHandler(req)
    .then(result => res.status(200).json(result))
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.put('/api/addStock', (req, res) => {
    putHandler(req, false)
    .then(updated => res.json(updated))
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.put('/subStock', (req, res) => {
    putHandler(req, true)
    .then(updated => res.json(updated))
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.delete('/remove', (req, res) => {
    deleteHandler(req)
    .then((deleted) => res.json(deleted))
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

export default prodRouter