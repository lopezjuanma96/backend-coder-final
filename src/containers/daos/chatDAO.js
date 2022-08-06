import { Schema, Model } from 'mongoose';
import DTO from '../dtos/chatDTO';
import ContainerFactory from '../factory.js';

const CONTAINER_TYPE = 'firebase';
var REFER;

if(CONTAINER_TYPE === 'firebase'){
    REFER = 'chat';
} else if (CONTAINER_TYPE === 'mongo'){
    const schema = new Schema({
        id: {type: Number, required: true},
        socket: {type: String, required: true, max: 100},
        user: {type: String, required: true, max: 50},
        msg: {type: String, max: 255},
        date: {type: Date}
    });
    REFER = new Model('chat', schema);
}

class DAO{
    container;

    constructor(){
        container = ContainerFactory.getContainer(CONTAINER_TYPE, REFER);
    }

    async save(obj){
        const toSave = obj.getForDb();
        const saved = await this.container.save(toSave);
        return saved;
    }

    async getAll(){
        const got = await this.container.getAll();
        return new DTO(got);
    }

    async getSome(key, val){
        var got;
        if (key === 'id'){
            got = await this.container.getById(val);
        } else {
            got = await this.container.getByAttr(key, val);
        }
        return new DTO(got);
    }

    async deleteAll(){
        const got = await this.container.deleteAll();
        return new DTO(got);
    }

    async deleteSome(key, val){
        var got;
        if (key === 'id'){
            got = await this.container.deleteById(val);
        } else {
            got = await this.container.deleteByAttr(key, val);
        }
        return new DTO(got);
    }
}