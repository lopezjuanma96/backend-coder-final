import mongoose from "mongoose";

///////////PRODUCTS/////////////
const productsCollection = 'productos'
const productsSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true, max: 100},
    id: {type: Number, required: true},
    timestamp: {type: Number, required: true}
})

///////////CART/////////////
const cartCollection = 'carrito'
const cartProductSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true, max: 100},
    id: {type: Number, required: true},
    number: {type: Number, required: true}
})
const cartSchema = new mongoose.Schema({
    productos: {type: [cartProductSchema]}, //sets products to be an array of the schema cartProductSchema
    id: {type: Number, required: true},
    timestamp: {type: Number, required: true}
})

///////////CHAT/////////////
const chatCollection = 'chat'
const chatSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    socket: {type: String, required: true, max: 100},
    user: {type: String, required: true, max: 50},
    msg: {type: String, max: 255},
    date: {type: Date}
})

///////////USERS/////////////

const usersCollection = 'usuarios'
const usersSchema = new mongoose.Schema({
    id: {type: String, required: true, max: 50}, //id will be username to use Container.getById()
    name: {type: String, required: true, max: 50},
    surname: {type: String, max: 50},
    age: {type: Number},
    email: {type: String, required: true, max: 50},
    pass: {type: String, required: true, max: 100}
})

export const productsModel = mongoose.model(productsCollection, productsSchema)
export const cartModel = mongoose.model(cartCollection, cartSchema)
export const chatModel = mongoose.model(chatCollection, chatSchema)
export const usersModel = mongoose.model(usersCollection, usersSchema)