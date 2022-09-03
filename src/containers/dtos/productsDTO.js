import { validate } from '../../models/products.js'

class DTO{
    #id; #name; #price; #stock; #thumbnail; #creation; #lastUpdate;

    constructor(obj){
        this.id = obj.id;
        this.name = obj.name;
        this.price = obj.price;
        this.stock = obj.stock;
        this.thumbnail = obj.thumbnail;
        this.creation = obj.created;
        this.lastUpdate = obj.updated;
        validate(this)
    }

    //GETTERS
    getId = () => this.#id;
    getName = () => this.#name;
    getPrice = () => this.#price;
    getStock = () => this.#stock;
    getThumbnail = () => this.#thumbnail;
    getCreationDate = () => this.#creation;
    getLastUpdateDate = () => this.#lastUpdate;

    //SETTERS
    setName = (val) => this.#name = val;
    setPrice = (val) => this.#price = val;
    setThumbnail = (val) => this.#thumbnail = val;
    stockUp = (val) => this.#stock += val;
    stockDown = (val) => this.#stock -= val;

    exists(){
        return (this.#name && this.#price && this.#stock)
    }

    getForDb(){
        return {
            id: this.getId(),
            name: this.getName(),
            price: this.getPrice(),
            stock: this.getStock(),
            thumbnail: this.getThumbnail(),
            created: this.getCreationDate(),
            updated: this.getLastUpdateDate()
        }
    }
}

export default DTO;