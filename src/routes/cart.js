import { Router } from "express";
import { getHandler, postHandler, deleteHandler } from "../controllers/cart.js";

import logger from '../utils/logger.js';

const cartRouter = new Router();

cartRouter.get('/', (req, res) => {
    getHandler(req)
    .then(results => res.render('cart', results))
    .catch(err => {
        logger.error(err.message);
        res.render('error', {err});
    })
})

cartRouter.get('/api', (req, res) => {
    getHandler(req)
    .then(results => res.json(results))
    .catch(err => {
        logger.error(err.message);
        res.json({error: err.message});
    })
})

cartRouter.post('/api/add', (req, res) => {
    postHandler(req)
    .then(results => res.json(results))
    .catch(err => {
        logger.error(err.message);
        res.json({error: err.message});
    })
})

cartRouter.delete('/api/remove', (req, res) => {
    deleteHandler(req, false)
    .then(results => res.json(results))
    .catch(err => {
        logger.error(err.message);
        res.json({error: err.message});
    })
})

cartRouter.delete('api/empty', (req, res) => {
    deleteHandler(req, true)
    .then(results => res.json(results))
    .catch(err => {
        logger.error(err.message);
        res.json({error: err.message});
    })
})

export default cartRouter;