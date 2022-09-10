import { Color } from "../types/color.ts";

const list: Color[] = [];

export const getColors = async (): Promise<Color[]> => {
    return new Promise((resolve, reject) => {
        resolve(list)
    })
}

export const getColorByName = async (name: string): Promise<Color[]> => {
    return new Promise((resolve, reject) => {
        const filtered: Color[] = list.filter(c => c.name === name)
        if (filtered.length > 0) resolve(filtered);
        else reject('Non existing color name');
    })
}

export const getColorByUser = async (user: string): Promise<Color[]> => {
    return new Promise((resolve, reject) => {
        const filtered: Color[] = list.filter(c => c.user === user)
        if (filtered.length > 0) resolve(filtered);
        else reject('Non existing color user');
    })
}

export const addColor = async (name: string, user: string): Promise<Color> => {
    return new Promise((resolve, reject) => {
        try{
            const toAdd: Color = {
                name,
                user,
                addded: new Date()
            };
            list.push(toAdd);
            resolve(toAdd);
        } catch (err) {
            reject(err.message);
        }
    })
}