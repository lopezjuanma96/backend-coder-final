import { addNewMessage, getAllMessages } from "../services/chat.js";

export async function getHandler(req){
    const user = req.session?.user;

    const data = await getAllMessages();
    
    return { userData: user, msgData: {items: data} };//HERE im not being able to serialize the DTO, so for what is it worth?
}

export async function postHandler(req){
    const body = req.body;
    const user = body.user || req.session?.user;
    
    if (!user) throw new Error('Unable to identify user for new message')
    const data = await addNewMessage(user, body);

    return data;
}