import DAO from '../containers/daos/chatDAO.js';

const dao = new DAO();

export async function getHandler(req){
    const user = req.session?.user || 'default';
    const msgs = await dao.getAll()
    return { userData: {userAlias: user}, msgData: {items: msgs.map(m => m.getForDb())} };
}