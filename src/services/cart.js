import CartDAO from '../containers/daos/cartDAO.js'
import ProductsDAO from '../containers/daos/cartDAO.js'

const cartDAO = new CartDAO();
const productsDAO = new ProductsDAO();

export async function getOneCartByUser(user){
    const cart = await cartDAO.getFirst('user', user);
    return cart;
}

export async function fillCartProducts(cartProductIds){
    const cartProducts = []
    var cartPrice;
    for (id in cartProductIds){
        const eachProd = await productsDAO.getFirst('id', id);
        cartProducts.push({...eachProd.getForDb(), stock: cartProductIds[`${id}`]})
        cartPrice += eachProd.getPrice() * cartProductIds[`${id}`];
    }
    return { cartProducts, cartPrice }
}

export async function addProductToCart(cartUser, productId){
    const cart = await cartDAO.getFirst('user', cartUser);
    cart.addProduct(productId);
    await cartDAO.save(cart);
    return cart.getForDb();
}

export async function deleteProductFromCart(cartUser, productId){
    const cart = await cartDAO.getFirst('user', cartUser);
    if (productId){
        cart.removeProduct(productId);
        await cartDAO.save(cart);
        return cart.getForDb();
    } else {
        throw new Error('No Product ID provided to delete from cart')
    }
}

export async function emptyCartProducts(cartUser){
    const cart = await cartDAO.getFirst('user', user);
    cart.emptyProducts();
    await cartDAO.save(cart);
    return cart.getForDb();
}