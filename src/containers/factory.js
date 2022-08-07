import Firebase from './firebase.js';
import Mongo from './mongo.js';
import Memory from './memory.js';

class ContainerFactory{
    static getContainer(type, refer){
        var container;
        if (type === 'firebase') {
            container = new Firebase(refer);
        } else if (type === 'mongo') {
            container = new Mongo(refer);
        } else if (type === 'memory') {
            container = new Memory();
        }
        return container;
    }
}

export default ContainerFactory;