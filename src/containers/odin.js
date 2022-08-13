class odin {
    constructor(){
        if (this.constructor.name == 'odin'){
            throw new Error(`constructor not implemented for ${this.constructor.name}`);
        }
    }

    _nextNumber(list){
        var n = 0;
        list.forEach((e) => {
            n = n < parseInt(e) ? parseInt(e)+1 : n;
        })
        return n;
    }

    save(){
        throw new Error(`save not implemented for ${this.constructor.name}`);
    }

    getAll(){
        throw new Error(`getAll not implemented for ${this.constructor.name}`);
    }
    getById(){
        throw new Error(`getById not implemented for ${this.constructor.name}`);
    }
    getByAttr(){
        throw new Error(`getByAttr not implemented for ${this.constructor.name}`);
    }

    deleteAll(){
        throw new Error(`deleteAll not implemented for ${this.constructor.name}`);
    }
    deleteById(){
        throw new Error(`deleteById not implemented for ${this.constructor.name}`);
    }
    deleteByAttr(){
        throw new Error(`deleteByAttr not implemented for ${this.constructor.name}`);
    }
}

export default odin;