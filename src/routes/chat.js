import DAO from '../containers/daos/chatDAO.js';
import { Router } from 'express';

const chatRouter = new Router();

chatRouter.get('/', (req, res) => {
    const user = req.session?.user;
    res.render('chat', { userData: user });
})

export default chatRouter;