import { Router } from "express";
import CartDAO from '../containers/daos/cartDAO.js'
import ProductsDAO from '../containers/daos/cartDAO.js'

import logger from '../utils/logger.js';

const cartRouter = new Router();
const cartDAO = new CartDAO();
const productsDAO = new ProductsDAO();

cartRouter.get('/', (req, res) => {
    const user = req.session?.user || 'default';
    cartDAO.getFirst('user', user)
    .then(cart => {
        cart = cart.getForDb();
        if (cart.products.length > 0) {
            const cartProductsId = Object.keys(cart.products)
            const cartProductsAmt = Object.values(cart.products)
            Promise.all(cartProductsId.map(pId => productsDAO.getSome(pId)))
            .then(cartProductsData => {
                const cartProducts = []
                var cartTotalPrice;
                for (let i=0; i<cartProductsData.length; i++){
                    cartProducts.push( { ...cartProductsData[i].getForDb(), stock: cartProductsAmt[i] } )
                    cartTotalPrice += cartProducts[i].price*cartProducts[i].stock;
                }
                res.status(200).render('cart', { 
                                        userData: {userAlias: user}, 
                                        cartData: {items: cartProducts, exists: cartProducts.length > 0, total: cartTotalPrice}
                                    })
            })
        } else {
            res.status(200).render('cart', { 
                userData: {userAlias: user}, 
                cartData: {exists: false}
            })
        }
    })
    .catch(err => {
        logger.error(err.message);
        res.status(404).json({error: err.message});
    })
})

cartRouter.post('/add', (req, res) => {
    const user = req.session?.user;
    const prodId = req.query.id;
    cartDAO.getFirst('user', user)
    .then(cart => {
        cart.addProduct(prodId);
        cartDAO.save(cart)
        .then(updated => res.redirect('./'))
    })
    .catch(err => {
        logger.error(err.message);
        res.status(404).json({error: err.message});
    })
})

cartRouter.delete('/remove', (req, res) => {
    const user = req.session?.user;
    const prodId = req.query.id;
    cartDAO.getFirst('user', user)
    .then(cart => {
        cart.removeProduct(prodId);
        cartDAO.save(cart)
        .then(updated => res.redirect('./'))
    })
    .catch(err => {
        logger.error(err.message);
        res.status(404).json({error: err.message});
    })
})

cartRouter.delete('/empty', (req, res) => {
    const user = req.session?.user;
    const prodId = req.query.id;
    cartDAO.getFirst('user', user)
    .then(cart => {
        cart.emptyProducts();
        cartDAO.save(cart)
        .then(updated => res.redirect('./'))
    })
    .catch(err => {
        logger.error(err.message);
        res.status(404).json({error: err.message});
    })
})

export default cartRouter;