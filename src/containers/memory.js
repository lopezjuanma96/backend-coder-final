import odin from './odin.js';

class Container extends odin {
    db;

    constructor(){
        super();
        this.db = [];
    }

    #idExists(id){
        return this.db.findIndex((e) => e.id === id);
    }
    #autoId(){
        return this._nextNumber(this.db.map(e => e.id));
    }

    async save(data){
        if (data.id){
            const index = this.#idExists(data)
            if (index > -1 ){
                this.db[index] = data;
            } else {
                this.db.push(data);
            }
        } else {
            this.db.push({id: this.#autoId(), ...data});
        }
        return data;
    }

    async getAll(){
        return this.db;
    }
    async getById(id){
        const index = this.#idExists(id);
        return index > -1 ? this.db[index] : {};
    }
    async getByAttr(key, val){
        return this.db.filter((e) => e[`${key}`] === val);
    }

    async deleteAll(){
        this.db = [];
        return this.db;
    }
    async deleteById(id){
        const index = this.#idExists(id);
        const deleted = index > -1 ? this.db[index] : {};
        this.db = this.db.filter((e, i) => i != index)
        return deleted;
    }
    async deleteByAttr(key, val) {
        const deleted = this.db.filter((e) => e[`${key}`] === val);
        this.db = this.db.filter((e) => e[`${key}`] !== val);
        return deleted;
    }
}

export default Container;