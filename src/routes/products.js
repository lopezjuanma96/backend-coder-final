import DAO from '../containers/daos/productsDAO.js';
import DTO from '../containers/dtos/productsDTO.js';
import { Router } from 'express';

import logger from '../utils/logger.js';

const prodRouter = new Router();

prodRouter.get('/', (req, res) => {
    DAO.getAll()
    .then(prods => res.render('products', {prods}))
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.get('/:id', (req, res) => {
    DAO.getSome('id', req.params.id)
    .then(prods => {
        if (prods.length == 1) {
            res.render('productDetail', {prod: prods[0]})
        } else {
            logger.error('invalid ID');   
            res.json({err: 'invalid ID'});
        }
    })
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.post('/add', (req, res) => {
    const prodToAdd = req.body;
    DAO.getSome('id', prodToAdd.id)
    .then((prods) => {
        if (prods.length == 0){
            DAO.save(new DTO(prodToAdd))
            .then((p) => res.redirect('./'))
        } else if (prods.length == 1){
            prods[0].stockUp(prodToAdd.stock);
            DAO.save(prods[0])
            .then((p) => res.redirect('./'))
        } else {
            logger.error('invalid request body');   
            res.json({err: 'invalid request body'});
        }
    })
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.put('/addStock/:id', (req, res) => {
    const idToModify = req.params.id;
    const qToAdd = req.query.q > 1 ? req.query.q : 1;
    DAO.getSome('id', idToModify)
    .then((prods) => {
        prods[0].stockUp(qToAdd);
        DAO.save(prods[0])
        .then((p) => res.redirect('./'))
    })
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.put('/subStock/:id', (req, res) => {
    const idToModify = req.params.id;
    const qToSub = req.query.q > 1 ? req.query.q : 1;
    DAO.getSome('id', idToModify)
    .then((prods) => {
        prods[0].stockDown(qToSub);
        DAO.save(prods[0])
        .then((p) => res.redirect('./'))
    })
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.delete('/remove/:id', (req, res) => {
    const idToDelete = req.params.id;
    DAO.deleteSome('id', idToDelete)
    .then((del) => {
        res.redirect('./')
    })
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

export default prodRouter