import { getOneProductById, getAllProducts, 
    addProduct, 
    moreProduct, lessProduct,
    deleteProduct 
} from '../services/products.js'

export async function getHandler(req){
    const user = req.session?.user;
    const id = req.query.id;

    if(id){
        const data = await getOneProductById(id);
        return { userData: {...user, isAdmin: true}, prodData: {prods, exists: true} }
    } else {
        const prods = await getAllProducts();
        return { userData: {...user, isAdmin: true}, prodData: {prods, exists: prods.length > 0} }
    }
}

export async function postHandler(req){
    const prodToAdd = req.body;

    const data = await addProduct(prodToAdd);

    return data;
}

export async function putHandler(req, substract){
    const id = req.query.id;
    const q = req.query.q > 1 ? req.query.q : 1;
    var data;
    
    if (substract) data = lessProduct(id, q);
    else data = moreProduct(id, q);

    return data
}

export async function deleteHandler(req){
    const id = req.query.id;

    const data = await deleteProduct(id);

    return data;
}