import {
    getOneCartByUser,
    fillCartProducts,
    addProductToCart,
    emptyCartProducts,
    deleteProductFromCart
} from '../services/cart.js'

export async function getHandler(req){
    const user = req.session?.user || 'default';

    const cart = await getOneCartByUser(user);
    const { cartProducts, cartPrice } = await fillCartProducts(cart.products);
    
    return { userData: {userAlias: user}, cartData: {items: cartProducts, exists: cartProducts.length > 0, total: cartPrice}}
}

export async function postHandler(req){
    const user = req.session?.user;
    const id = req.query.id;

    const data = await addProductToCart(user, id);

    return data;
}

export async function deleteHandler (req, empty) {
    const user = req.session?.user;
    const id = req.query.id;
    var data;

    if (empty) data = await emptyCartProducts(user);
    else if (id) data = await deleteProductFromCart(user, id);

    return data;
}