import DAO from '../containers/daos/usersDAO.js';
import DTO from '../containers/dtos/usersDTO.js';

const dao = new DAO();

export async function getOneUserByAlias(alias){
    const user = await dao.getFirst('alias', alias);
    return user.getForDb();
}

export async function getOneUserById(id){
    const user = await dao.getFirst('id', id);
    return user.getForDb();
}

export async function getAllUsers(){
    const users = await dao.getAll();
    return users.map(u => u.getForDb())
}

export async function registerNewUser(body){
    await dao.save(new DTO(body));
    return { userData: body }
}

export async function loginUser(body){
    if (body.alias){
        thisUser = await dao.getFirst('alias', body.alias);
    } else {
        thisUser = await dao.getFirst('email', body.email);
    }
    if (thisUser.exists() && thisUser.validatePassword(body.password)){
        return { userData: thisUser.getForDb() }
    } else {
        throw new Error('Invalid Credentials!')
    }
}

export async function updateUserByAlias(alias, body){
    const user = await getOneUserByAlias(alias);
    const updated = {...user, ...body}
    await dao.save(new DTO(updated))
    return updated;
}

export async function updateUserById(id, body){
    const user = await getOneUserById(id);
    const updated = {...user, ...body}
    await dao.save(new DTO(updated))
    return updated;
}

export async function deleteUserByAlias(alias){
    const user = await dao.deleteSome('alias', alias);
    return user.getForDb();
}

export async function deleteUserById(id){
    const user = await dao.deleteSome('id', id);
    return user.getForDb();
}

