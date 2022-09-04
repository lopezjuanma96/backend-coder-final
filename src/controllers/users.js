import { getAllUsers, getOneUserByAlias, getOneUserById, 
    registerNewUser, loginUser, checkUserAvailable,
    updateUserByAlias, updateUserById, 
    deleteUserByAlias, deleteUserById 
} from '../services/users.js'

export async function getHandler(req){
    const id = req.query.id;
    const alias = req.query.alias;
    var data;

    if (alias) data = await getOneUserByAlias(alias);
    else if (id) data = await getOneUserById(id);
    else data = await getAllUsers();

    return data;
}

export async function logoutGetHandler(req){
    const user = req.session.user;
    if (user) {
        req.session.destroy(err => {
            if (err) {
                throw new Error(`Unable to finish session`)
            } else {
                return {userData: user}
            }
        })
    } else {
        throw new Error('Unexisting session')
    }
}

export async function registerPostHandler(req){
    const body = req.body;
    if (!(body.alias && body.password && body.email)){
        throw new Error('Credentials missing');
    } else if (body.password !== body.passwordRepeat) {
        throw new Error('Passwords do not coincide');
    }
    const unavailable = await checkUserAvailable(body);
    if (unavailable.length == 0) {
        const data = await registerNewUser(body);
        return data;
    } else {
        throw new Error(`${unavailable.map(a => a[0]).join(' & ')} are already in use. Choose a different value for them`);
    }
}

export async function loginPostHandler(req){
    const body = req.body;
    if (!((body.alias || body.email) && body.password)){
        throw new Error('Credentials missing');
    } else {
        const data = await loginUser(body);
        return data;
    }
}

export async function putHandler(req){
    const id = req.query.id;
    const alias = req.query.alias;
    const body = req.body;
    if (alias) {
        const data = await updateUserByAlias(alias, body)
    } else if (id) {
        const data = await updateUserById(id, body)
    } else {
        throw new Error('No alias or ID provided')
    }
    return data;
}

export async function deleteHandler(req){
    const id = req.query.id;
    const alias = req.query.alias;
    if (alias) {
        const data = await deleteUserByAlias(alias);
        return data;
    } else if (id) {
        const data = await deleteUserById(id);
        return data;
    } else {
        throw new Error('No alias or ID provided')
    }
}