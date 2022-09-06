import DAO from '../containers/daos/productsDAO.js';
import DTO from '../containers/dtos/productsDTO.js';

const dao = new DAO();

export async function getOneProductById(id){
    var prod = await dao.getFirst('id', id);
    if(prod){
        return prod.getForDb();
    } else {
        throw new Error('Invalid Product ID');
    }
}

export async function getAllProducts(){
    const prods = await dao.getAll();
    return prods.map(p => p.getForDb()); //HERE im not being able to serialize the DTO, so for what is it worth?
}

async function addExistingProduct(prod, prodToAdd){
    prod.stockUp(prodToAdd.stock);
    await dao.save(prod);
    return prod.getForDb();
}

export async function addProduct(prodToAdd){
    const prod = await dao.getFirst('name', prodToAdd.name);
    if (prod) {
        const updatedProd = await addExistingProduct(prod, prodToAdd);
        return updatedProd;
    } else {
        const prodAdded = await dao.save(new DTO(prodToAdd));
        return prodAdded;
    }
}

export async function moreProduct(id, q){
    const prod = await dao.getFirst('id', id);
    if (prod) {
        prod.stockUp(q);
        await dao.save(prod);
        return prod.getForDb();
    } else {
        throw new Error('Invalid product ID')
    }
}

export async function lessProduct(id, q){
    const prod = await dao.getFirst('id', id);
    if (prod) {
        prod.stockDown(q);
        await dao.save(prod);
        return prod.getForDb();
    } else {
        throw new Error('Invalid product ID')
    }
}

export async function deleteProduct(id){
    const deleted = await dao.deleteSome('id', id);
    return deleted.getForDb();
}