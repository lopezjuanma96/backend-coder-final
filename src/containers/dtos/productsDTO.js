class DTO{
    #id; #name; #stock; #thumbnail; #creation; #lastUpdate;

    constructor(obj){
        this.#id = obj.id;
        this.#name = obj.name;
        this.#stock = obj.stock;
        this.#thumbnail = obj.thumbnail;
        this.#creation = obj.created;
        this.#lastUpdate = obj.updated;
    }

    //GETTERS
    getId = () => this.#id;
    getName = () => this.#name;
    getStock = () => this.#stock;
    getThumbnail = () => this.#thumbnail;
    getCreationDate = () => this.#creation;
    getLastUpdateDate = () => this.#lastUpdate;

    //SETTERS
    setName = (val) => this.#name = val;
    setThumbnail = (val) => this.#thumbnail = val;
    stockUp = (val) => this.#stock += val;
    stockDown = (val) => this.#stock -= val;

    getForDb(){
        return {
            id: this.getId(),
            name: this.getName(),
            stock: this.getStock(),
            thumbnail: this.getThumbnail(),
            created: this.getCreationDate(),
            updated: this.getLastUpdateDate()
        }
    }
}

export default DTO;