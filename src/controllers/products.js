import DAO from '../containers/daos/productsDAO.js';
import DTO from '../containers/dtos/productsDTO.js';

const dao = new DAO();

export async function getHandler(req){
    const user = req.session?.user || 'default';
    const id = req.query.id;
    if(id){
        var prod = await dao.getFirst('id', id);
        if(prod){
            return prod.getForDb();
        } else {
            throw new Error('Invalid Product ID');
        }
    } else {
        var prods = await dao.getAll()
        prods = prods.map(p => p.getForDb()); //HERE im not being able to serialize the DTO, so for what is it worth?
        return { userData: {userAlias: user, isAdmin: true}, prodData: {prods, exists: prods.length > 0} }
    }
}

export async function postHandler(req){
    const prodToAdd = req.body;
    const prod = await dao.getFirst('id', prodToAdd.id)
    if (prod) {
        prod.stockUp(prodToAdd.stock);
        await dao.save(prod)
        return prod;
    } else {
        await dao.save(new DTO(prodToAdd))
        return prod;
    }
}

export async function putHandler(req, substract){
    const id = req.query.id;
    const q = req.query.q > 1 ? req.query.q : 1;
    const prod = await dao.getFirst('id', id);
    if (prod) {
        if (substract) {
            prod.stockDown(q);
        } else {
            prod.stockUp(q);
        }
        await dao.save(prod);
        return prod;
    } else {
        throw new Error('Invalid product ID')
    }
}

export async function deleteHandler(req){
    const id = req.query.id;
    const deleted = await dao.deleteSome('id', id);
    return deleted;
}