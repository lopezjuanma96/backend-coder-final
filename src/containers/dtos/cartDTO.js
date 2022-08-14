class DTO{
    #id; #user; #products; #creation; #lastUpdate;

    constructor(obj){
        this.#id = obj.id;
        this.#user = obj.user;
        this.#products = obj.products || [];
        this.#creation = obj.created;
        this.#lastUpdate = obj.updated;
    }

    //GETTERS
    getId = () => this.#id;
    getUser = () => this.#user;
    getProducts = () => this.#products;
    getCreationDate = () => this.#creation;
    getLastUpdateDate = () => this.#lastUpdate;

    //SETTERS
    addProduct = (id) => this.#products.push(id);
    addProducts = (arr) => this.#products.push(...arr);
    removeProduct = (id) => this.#products = this.#products.filter(e => e !== id);
    removeProducts = (arr) => this.#products = this.#products.filter(e => !arr.includes(e));
    emptyProducts = () => this.#products = [];

    productCounts(){
        const counts = {};
        this.#products.forEach(p => {
            counts[p] = counts[p] + 1 || 1;
        });
        return counts;
    }

    getForDb(){
        return {
            id: this.getId(),
            user: this.getUser(),
            products: this.productCounts(),
            created: this.getCreationDate(),
            updated: this.getLastUpdateDate()
        }
    }
}

export default DTO;