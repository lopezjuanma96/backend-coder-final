import cartDAO from '../../containers/daos/cartDAO.js';
import CartType from '../type/Cart.js';

const getCart = {
    type: CartType,
    description: 'get a Cart by it\'s user',
    args: {
        user: { type: GraphQLString }
    },
    resolve: async (_, { user }) => {
        const cart = await cartDAO.getFirst('user', user);
        return cart
    }
}

const addProduct = {
    type: CartType,
    description: 'add Product by ID to a Cart by user',
    args: {
        user: { type: GraphQLString },
        id: { type: GraphQLID }
    },
    resolve: async (_, { user, id }) => {
        const cart = await cartDAO.getFirst('user', user);
        cart.addProduct(id);
        await cartDAO.save(cart);
        return cart
    }
}

const removeProduct = {
    type: CartType,
    description: 'remove Product by ID to a Cart by user',
    args: {
        user: { type: GraphQLString },
        id: { type: GraphQLID }
    },
    resolve: async (_, { user, id }) => {
        const cart = await cartDAO.getFirst('user', user);
        cart.removeProduct(id);
        await cartDAO.save(cart);
        return cart
    }
}

const emptyCart = {
    type: CartType,
    description: 'empry a Cart by user',
    args: {
        user: { type: GraphQLString }
    },
    resolve: async (_, { user, id }) => {
        const cart = await cartDAO.getFirst('user', user);
        cart.emptyProducts();
        await cartDAO.save(cart);
        return cart
    }
}

export const CartController = {
    queries: {
        getCart
    },
    mutations: {
        addProduct,
        removeProduct,
        emptyCart
    }
}