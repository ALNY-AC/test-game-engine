import Node from "./Node";

export default class Component {

    node?: Node;
    name: string;

    constructor(name: '') {
        this.name = name;
    }
    start(): void { };
}