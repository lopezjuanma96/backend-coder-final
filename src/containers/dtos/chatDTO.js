import { validate } from '../../models/chat.js'

class DTO{
    id; user; text; date;

    constructor(obj){
        try {
            validate(obj);
        } catch (err) {
            throw new Error(`Chat Object:\n${obj}\n did not pass validation because of:\n${err.message}`)
        }
        this.id = obj.id;
        this.socket = obj.socket;
        this.user = obj.user;
        this.msg = obj.text;
        this.date = obj.date;
    }

    //GETTERS
    getId = () => this.id;
    getUser = () => this.user;
    getText = () => this.text;
    getDate = () => this.date;

    exists(){
        return (this.user && this.text)
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