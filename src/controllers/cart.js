import CartDAO from '../containers/daos/cartDAO.js'
import ProductsDAO from '../containers/daos/cartDAO.js'

const cartDAO = new CartDAO();
const productsDAO = new ProductsDAO();

export async function getHandler(req){
    const user = req.session?.user || 'default';
    const cart = await cartDAO.getFirst('user', user);
    const cartProducts = []
    var cartPrice;
    for (id in cart.products){
        const eachProd = await productsDAO.getFirst('id', id);
        cartProducts.push({...eachProd.getForDb(), stock: cart.products[`${id}`]})
        cartPrice += eachProd.getPrice() * cart.products[`${id}`];
    }
    return { userData: {userAlias: user}, cartData: {items: cartProducts, exists: cartProducts.length > 0, total: cartPrice}}
}

export async function postHandler(req){
    const user = req.session?.user;
    const id = req.query.id;
    const cart = await cartDAO.getFirst('user', user);
    cart.addProduct(id);
    await cartDAO.save(cart);
    return cart.getForDb();
}

export async function deleteHandler (req, empty) {
    const user = req.session?.user;
    const cart = await cartDAO.getFirst('user', user);
    if (empty) {
        cart.emptyProducts();
        await cartDAO.save(cart)
    } else {
        const id = req.query.id;
        cart.removeProduct(id);
        await cartDAO.save(cart)
    }
    return cart.getForDb();
}