import DAO from '../containers/daos/chatDAO.js';
import { Router } from 'express';

const chatRouter = new Router();

chatRouter.get('/', (req, res) => {
    const user = req.session?.user || 'default';
    res.render('chat', { userData: {userAlias: user} });
})

export default chatRouter;