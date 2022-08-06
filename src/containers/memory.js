import odin from './odin.js';

class memory extends odin {
    db;

    constructor(){
        db = [];
    }

    #idExists(id){
        return db.findIndex((e) => e.id === id);
    }
    #autoId(){
        var newId = 0;
        db.forEach((e) => {
            newId = newId < e.id ? e.id+1 : newId;
        })
        return newId;
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