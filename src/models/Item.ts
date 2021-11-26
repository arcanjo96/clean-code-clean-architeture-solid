import { randomUUID } from 'crypto';

class Item {
    private objectId: string;
    constructor(public description: string, public price: number, public quantity: number) {
        this.objectId = randomUUID();
    }
}

export { Item };