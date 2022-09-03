import DAO from '../containers/daos/chatDAO.js';
import DTO from '../containers/dtos/chatDTO.js';

const dao = new DAO();

export async function getAllMessages(){
    const msgs = await dao.getAll()
    return msgs.map(m => m.getForDb())
}

export async function addNewMessage(user, body){
    const msgBody = {
        ...body,
        user,
        date: Date.now()
    };
    await dao.save(new DTO(msgBody));
    return msgBody;
}