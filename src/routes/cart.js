import { Router } from "express";
import DAO from '../containers/daos/cartDAO.js'

import logger from '../utils/logger.js';

const cartRouter = new Router();

cartRouter.get('/', (req, res) => {
    const user = req.session?.user;
    DAO.getSome('user', user)
    .then(cart => {
        res.status(200).json(cart.get())
    })
    .catch(err => {
        logger.error(err.message);
        res.status(404).json({error: err.message});
    })
})

cartRouter.post('/add', (req, res) => {
    const user = req.session?.user;
    const prodId = req.query.id;
    DAO.getSome('user', user)
    .then(cart => {
        cart.addProduct(prodId);
        DAO.save(cart);
        res.redirect('./');
    })
    .catch(err => {
        logger.error(err.message);
        res.status(404).json({error: err.message});
    })
})

cartRouter.post('/remove', (req, res) => {
    const user = req.session?.user;
    const prodId = req.query.id;
    DAO.getSome('user', user)
    .then(cart => {
        cart.removeProduct(prodId);
        DAO.save(cart);
        res.redirect('./');
    })
    .catch(err => {
        logger.error(err.message);
        res.status(404).json({error: err.message});
    })
})

export default cartRouter;