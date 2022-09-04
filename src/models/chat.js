import JOI from 'joi';

const schema = JOI.object({
    //id: JOI.number().required(),
    socket: JOI.string().required().max(100),
    user: JOI.string().required().max(50),
    msg: JOI.string().required().max(255),
    date: JOI.date().required()
})

export async function validate(data){
    try{
        schema.validateAsync(data);
    } catch (err) {
        throw new Error(`Invalid data for chat:\n${data}\nError:\n${err.message}`)
    }
}