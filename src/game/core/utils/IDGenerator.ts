import { v4 as uuidv4 } from 'uuid';

export default class IDGenerator {

    prefix: string = '';

    constructor(category?: string) {
        this.prefix = `${category}.`;
    }
    getNewId(): string {
        return this.prefix + uuidv4();
    }
}