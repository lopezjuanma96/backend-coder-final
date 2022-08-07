import odin from './odin.js';
import admin from 'firebase-admin';

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const serviceAccount = require("./setup/react-backend-67669-firebase-adminsdk-wu9wg-56253767e1.json");

class Container extends odin {
    db;

    constructor(collection){
        super();
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
        this.db = admin.firestore().collection(collection);
    }

    async save(data){
        if (data.id){
            const thisDoc = this.db.doc(data.id)
            const thisDocSn = await thisDoc.get()
            if (thisDocSn.exists) {
                await thisDoc.update({...data, created: thisDocSn.get('created'), updated: Date.now()});
            } else {
                await thisDoc.create({...data, created: Date.now()});
            }
        } else {
            const existing = (await this.db.listDocuments()).map(doc => doc.id)
            const thisDoc = db.doc(this._nextNumber(existing));
            await thisDoc.create({...data, created: Date.now()});
        }
        return data;
    }

    async getAll(){
        const docs = await this.db.get();
        return docs.docs.map((doc) => { return {id:doc.id, ...doc.data()}});
    }
    async getById(id){
        const doc = await this.db.get(id);
        return {id: doc.id, ...doc.data()};
    }
    async getByAttr(key, val){
        const docs = await this.db.where(key, "==", val).get()
        return docs.docs.map((doc) => {
            return {id: doc.id, ...doc.data()}
        });
    }

    async deleteAll(){
        await this.db.delete();
    }
    async deleteById(id){
        const doc = await this.db.get(id);
        await doc.delete();
        return {id: doc.id, ...doc.data()};
    }
    async deleteByAttr(key, val) {
        const docs = await this.db.where(key, "==", val).get();
        const promises = [];
        docs.docs.forEach(doc => promises.push(doc.delete()))
        await Promise.all(promises)
        return docs.docs.map((doc) => {
            return {id: doc.id, ...doc.data()}
        });
    }
}

export default Container;