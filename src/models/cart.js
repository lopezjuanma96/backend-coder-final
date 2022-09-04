import JOI from 'joi';

const schema = JOI.object({
    //id: JOI.number().required(),
    productos: [JOI.number()],
    user: JOI.string().required().max(50),
    creation: JOI.date().required(),
    updated: JOI.date().required()
})

export async function validate(data){
    try{
        schema.validateAsync(data);
    } catch (err) {
        throw new Error(`Invalid data for cart:\n${data}\nError:\n${err.message}`)
    }
}