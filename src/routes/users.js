import { logoutGetHandler, registerPostHandler, loginPostHandler, deleteHandler } from "../controllers/users.js";
import { Router } from "express";
import logger from "../utils/logger.js";

const usersRouter = new Router();

usersRouter.get('/home', (req, res) => {
    const user = req.session?.user;
    if (user) {
        res.render('home', { userData: {...user, exists: true}});
    } else {
        res.render('home', { userData: {exists: false}})
    }
})

usersRouter.get('/register', (req, res) => {
    res.render('register');
})

usersRouter.post('/register', (req, res) => {
    registerPostHandler(req)
    .then(results => res.render('registerSuccess', results))
    .catch(err => {
        logger.error(err.message);
        res.render('registerFail', {err});
    })
})

usersRouter.post('/register/api', (req, res) => {
    registerPostHandler(req)
    .then(results => res.json(results))
    .catch(err => {
        logger.error(err.message);
        res.json({error: err});
    })
})

usersRouter.get('/login', (req, res) => {
    res.render('login');
})

usersRouter.post('/login', (req, res) => {
    loginPostHandler(req)
    .then(results => {
        req.session.user = results.userData;
        res.render('loginSuccess', results)
    })
    .catch(err => {
        logger.error(err.message);
        res.render('loginFail', {err});
    })
})

usersRouter.post('/login/api', (req, res) => {
    loginPostHandler(req)
    .then(results => res.json(results))
    .catch(err => {
        logger.error(err.message);
        res.json({error: err});
    })
})

usersRouter.get('/logout', (req, res) => {
    logoutGetHandler(req)
    .then(result => res.render('logout', result))
    .catch(err => {
        logger.error(err.message)
        res.render('error', {at:'logout', err:err.message})
    })
})

usersRouter.get('/logout/api', (req, res) => {
    logoutGetHandler(req)
    .then(result => res.json(result))
    .catch(err => {
        logger.error(err.message)
        res.json({at:'logout', err:err.message})
    })
})

export default usersRouter;