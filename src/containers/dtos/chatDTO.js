import { validate } from '../../models/chat.js'

class DTO{
    #id; #user; #text; #date;

    constructor(obj){
        this.id = obj.id;
        this.socket = obj.socket;
        this.user = obj.user;
        this.msg = obj.text;
        this.date = obj.date;
        validate(this)
    }

    //GETTERS
    getId = () => this.#id;
    getUser = () => this.#user;
    getText = () => this.#text;
    getDate = () => this.#date;

    exists(){
        return (this.#user && this.#text)
    }

    getForDb(){
        return {
            id: this.getId(),
            user: this.getUser(),
            text: this.getText(),
            date: this.getDate()
        }
    }
}

export default DTO;