import odin from './odin.js';

class Container extends odin {
    db;

    constructor(){
        super();
        db = [];
    }

    #idExists(id){
        return db.findIndex((e) => e.id === id);
    }
    #autoId(){
        return this._newNumber(db.map(e => e.id));
    }

    async save(data){
        if (data.id){
            const index = this.#idExists(data)
            if (index > -1 ){
                db[index] = data;
            } else {
                db.push(data);
            }
        } else {
            db.push({id: this.#autoId(), ...data});
        }
        return data;
    }

    async getAll(){
        return db;
    }
    async getById(id){
        const index = this.#idExists(id);
        return index > -1 ? db[index] : {};
    }
    async getByAttr(key, val){
        return db.filter((e) => e[`${key}`] === val);
    }

    async deleteAll(){
        db = [];
        return db;
    }
    async deleteById(id){
        const index = this.#idExists(id);
        const deleted = index > -1 ? db[index] : {};
        db = db.filter((e, i) => i != index)
        return deleted;
    }
    async deleteByAttr(key, val) {
        const deleted = db.filter((e) => e[`${key}`] === val);
        db = db.filter((e) => e[`${key}`] !== val);
        return deleted;
    }
}

export default Container;