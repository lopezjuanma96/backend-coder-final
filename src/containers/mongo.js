import odin from './odin.js';
import mongoose from 'mongoose';

export const URL = process.env.MONGOATLASURL

class Container extends odin {
    model;

    constructor(model){
        super();
        mongoose.connect(URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        ).then(() => this.model = model)
    }

    async save(data){
        if (data.id){
            const exists = await this.model.exists({id: data.id})
            if (exists) {
                const prev = await this.getById(data.id);
                await this.model.updateOne({id: data.id}, {$set: {...data, created: prev.created, updated: Date.now()}});
            } else {
                const thisDoc =  new this.model({...data, created: Date.now()});
                await thisDoc.save();
            }
        } else {
            const existing = (await this.getAll()).map(doc => doc.id)
            const thisDoc = new this.model({id: this._nextNumber(existing), ...data, created: Date.now()});
            await thisDoc.save();
        }
        return data;
    }

    async getAll(){
        const data = await this.model.find().lean().exec(); //using lean to get a json object instead of a mongoose one: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
        return data;
    }
    async getById(id){
        const data = await this.model.findOne({id: id}).lean().exec();//using lean to get a json object instead of a mongoose one: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
        return data;
    }
    async getByAttr(key, val){
        const search = {};
        search[`${key}`] = val;
        const data = await this.model.find(search).lean().exec(); //using lean to get a json object instead of a mongoose one: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
        return data;
    }

    async deleteAll(){
        await this.model.deleteMany();
    }
    async deleteById(id){
        const doc = await this.getById(id);
        await this.model.deleteOne({id: id});
        return {id: doc.id, ...doc.data()};
    }
    async deleteByAttr(key, val) {
        const docs = await this.getByAttr(key, val);
        const search = {};
        search[`${key}`] = val;
        await this.model.deleteMany(search);
        return docs.map(doc => {
            return {id: doc.id, ...doc}
        })
    }
}

export default Container;