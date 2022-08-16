import DAO from '../containers/daos/chatDAO.js';
import DTO from '../containers/dtos/chatDTO.js';

const dao = new DAO();

export async function getHandler(req){
    const user = req.session?.user;
    const msgs = await dao.getAll()
    return { userData: user, msgData: {items: msgs.map(m => m.getForDb())} };//HERE im not being able to serialize the DTO, so for what is it worth?
}

export async function postHandler(req){
    const body = req.body;
    console.log(body);
    const user = body.user || req.session?.user;
    console.log(user);
    if (!user){
        throw new Error('Unable to identify user for new message')
    }
    const msgBody = {
        ...body,
        user,
        date: Date.now()
    };
    await dao.save(new DTO(msgBody));
    return msgBody;
}