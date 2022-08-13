import DAO from '../containers/daos/productsDAO.js';
import DTO from '../containers/dtos/productsDTO.js';
import { Router } from 'express';

import logger from '../utils/logger.js';

const prodRouter = new Router();
const dao = new DAO();

prodRouter.get('/', (req, res) => {
    const user = req.session?.user || 'default';
    dao.getAll()
    .then(prods => {
        prods = prods.map(p => p.getForDb()); //HERE im not being able to serialize the DTO, so for what is it worth?
        res.render('products', { userData: {userAlias: user, isAdmin: true}, prodData: {prods, exists: prods.length > 0} });
    })
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.get('/:id', (req, res) => {
    dao.getSome('id', req.params.id)
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
    dao.getSome('id', prodToAdd.id)
    .then((prods) => {
        if (prods.length == 0){
            dao.save(new DTO(prodToAdd))
            .then((p) => res.redirect('./'))
        } else if (prods.length == 1){
            prods[0].stockUp(prodToAdd.stock);
            dao.save(prods[0])
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
    dao.getSome('id', idToModify)
    .then((prods) => {
        prods[0].stockUp(qToAdd);
        dao.save(prods[0])
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
    dao.getSome('id', idToModify)
    .then((prods) => {
        prods[0].stockDown(qToSub);
        dao.save(prods[0])
        .then((p) => res.redirect('./'))
    })
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

prodRouter.delete('/remove/:id', (req, res) => {
    const idToDelete = req.params.id;
    dao.deleteSome('id', idToDelete)
    .then((del) => {
        res.redirect('./')
    })
    .catch(err => {
        logger.error(err.message);   
        res.json({err: err.message});
    })
})

export default prodRouter