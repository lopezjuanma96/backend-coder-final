import mongoose from 'mongoose';
import DTO from '../dtos/productsDTO.js';
import ContainerFactory from '../factory.js';

const CONTAINER_TYPE = process.env.CART_CONTAINER_TYPE || 'memory';
var REFER;

if(CONTAINER_TYPE === 'firebase'){
    REFER = 'products';
} else if (CONTAINER_TYPE === 'mongo'){
    const schema = new mongoose.Schema({
        title: {type: String, required: true, max: 100},
        price: {type: Number, required: true},
        thumbnail: {type: String, required: true, max: 100},
        id: {type: Number, required: true},
        timestamp: {type: Number, required: true}
    });
    REFER = mongoose.model('products', schema);
}

class DAO{
    container;

    constructor(){
        this.container = ContainerFactory.getContainer(CONTAINER_TYPE, REFER);
    }

    async save(obj){
        const toSave = obj.getForDb();
        const saved = await this.container.save(toSave);
        return obj;
    }

    async getAll(){
        const got = await this.container.getAll();
        return got.map(g => new DTO(g));
    }

    async getSome(key, val){
        var got;
        if (key === 'id'){
            got = await this.container.getById(val);
        } else {
            got = await this.container.getByAttr(key, val);
        }
        return got.map(g => new DTO(g));
    }

    async getFirst(key, val){
        var got;
        if (key === 'id'){
            got = await this.container.getById(val);
        } else {
            got = await this.container.getByAttr(key, val);
        }
        return new DTO(got[0]);
    }

    async deleteAll(){
        const got = await this.container.deleteAll();
        return got.map(g => new DTO(g));
    }

    async deleteSome(key, val){
        var got;
        if (key === 'id'){
            got = await this.container.deleteById(val);
        } else {
            got = await this.container.deleteByAttr(key, val);
        }
        return got.map(g => new DTO(g));
    }
}

export default DAO;