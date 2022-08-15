class DTO{
    #id; #name; #alias; #email; #thumbnail; #password; #birthdate;

    constructor(obj){
        this.#id = obj.id;
        this.#name = obj.name;
        this.#alias = obj.alias;
        this.#email = obj.email;
        this.#thumbnail = obj.thumbnail;
        this.#password = obj.password;
        this.#birthdate = obj.birthdate;
    }

    //GETTERS
    getId = () => this.#id;
    getName = () => this.#name;
    getAlias = () => this.#alias;
    getPassword = () => this.#password;
    getEmail = () => this.#email;
    getThumbnail = () => this.#thumbnail;
    getBirthDate = () => this.#birthdate;
    
    //SETTERS
    setName = (val) => this.#name = val;
    setEmail = (val) => this.#email = val;
    setThumbnail = (val) => this.#thumbnail = val;
    setBirthDate = (val) => this.#birthdate = val;

    validatePassword(pass){
        return pass === this.#password; //HERE add encryption
    }

    exists(){
        return (this.#name && this.#password && this.#email)
    }

    getForDb(){
        return {
            id: this.getId(),
            name: this.getName(),
            alias: this.getAlias(),
            password: this.getPassword(),
            email: this.getEmail(),
            thumbnail: this.getThumbnail(),
            birthdate: this.getBirthDate()
        }
    }
}

export default DTO;