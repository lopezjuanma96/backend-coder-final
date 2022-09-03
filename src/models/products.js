import JOI from 'joi';

const schema = JOI.object({
    id: JOI.number().required(),
    name: JOI.string().required().max(100),
    price: JOI.number().required(),
    stock: JOI.number().required(),
    thumbnail: JOI.string().required().max(100),
    creation: JOI.date().required(),
    lastUpdate: JOI.date().required()
})

export async function validate(data){
    try{
        schema.validateAsync(data);
    } catch (err) {
        throw new Error(`Invalid data for product:\n${data}\nError:\n${err.message}`)
    }
}