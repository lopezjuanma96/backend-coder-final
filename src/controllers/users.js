import DAO from '../containers/daos/usersDAO.js';
import DTO from '../containers/dtos/usersDTO.js';

const dao = new DAO();

export async function getHandler(req){
    const id = req.query.id;
    const alias = req.query.alias;
    if (alias) {
        const user = await dao.getFirst('alias', alias);
        return user.getForDb();
    } else if (id) {
        const user = await dao.getFirst('id', id);
        return user.getForDb();
    } else {
        const users = await dao.getAll();
        return users.map(u => u.getForDb())
    }
}

export async function registerPostHandler(req){
    const body = req.body;
    if (!(body.alias && body.password && body.email)){
        throw new Error('Credentials missing');
    } else if (body.password !== body.passwordRepeat) {
        throw new Error('Passwords do not coincide');
    }
    const checks = ['email', 'alias']
    const sames = await Promise.all(checks.map(c => dao.getSome(c, body[`${c}`])))
    const unavailable = sames.map((v, i) => [checks[i], v]).filter(s => s[1].length > 0)
    if (unavailable.length == 0) {
        await dao.save(new DTO(body));
        return { userData: body }
    } else {
        throw new Error(`${unavailable.map(a => a[0]).join(' & ')} are already in use. Choose a different value for them`);
    }
}

export async function loginPostHandler(req){
    const body = req.body;
    var thisUser;
    if (!((body.alias || body.email) && body.password)){
        throw new Error('Credentials missing');
    }
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

export async function putHandler(req){
    const id = req.query.id;
    const alias = req.query.alias;
    const body = req.body;
    if (alias) {
        const user = await dao.getFirst('alias', alias);
        const updated = {...user, ...body}
        await dao.save(new DTO(updated))
        return updated;
    } else if (id) {
        const user = await dao.getFirst('id', id);
        const updated = {...user, ...body}
        await dao.save(new DTO(updated))
        return updated;
    } else {
        throw new Error('No alias or ID provided')
    }
}

export async function deleteHandler(req){
    const id = req.query.id;
    const alias = req.query.alias;
    if (alias) {
        const user = await dao.deleteSome('alias', alias);
        return user.getForDb();
    } else if (id) {
        const user = await dao.deleteSome('id', id);
        return user.getForDb();
    } else {
        throw new Error('No alias or ID provided')
    }
}