import JOI from 'joi';

const schema = JOI.object({
    //id: JOI.number().required(),
    name: JOI.string().required().max(50),
    alias: JOI.string().required().max(10),
    email: JOI.string().required().max(100),
    thumbnail: JOI.string().min(0).max(100),
    password: JOI.string().required().max(50),
    passwordRepeat: JOI.string().required().max(50),
    birthdate: JOI.date().required()
})

export async function validate(data){
    try{
        schema.validateAsync(data);
    } catch (err) {
        throw new Error(`Invalid data for cart:\n${data}\nError:\n${err.message}`)
    }
}