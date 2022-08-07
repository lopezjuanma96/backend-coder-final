class DTO{
    #id; #user; #text; #date;

    constructor(obj){
        this.#id = obj.id;
        this.#user = obj.user;
        this.#text = obj.text;
        this.#date = obj.date;
    }

    //GETTERS
    getId = () => this.#id;
    getUser = () => this.#user;
    getText = () => this.#text;
    getDate = () => this.#date;

    forDb(){
        return {
            id: this.getId(),
            user: this.getUser(),
            text: this.getText(),
            date: this.getDate()
        }
    }
}