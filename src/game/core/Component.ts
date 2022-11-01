import Node from "./Node";
import IDGenerator from "./utils/IDGenerator";
const iDGenerator = new IDGenerator('Component');

export default class Component {

    node!: Node;
    name: string;

    /**
     * 此节点的唯一id
     */
    id: string = iDGenerator.getNewId();

    /**
     * 是否已经被销毁了
     */
    isDestroy: Boolean = false;


    get uuid() {
        return this.id;
    }

    constructor(name: string = '') {
        this.name = name;
    }
    setNode(node: Node) {
        this.node = node;
    }
    getNode(): Node | undefined {
        return this.node;
    }

    start(): void { }
    update(dt: number): void { }
    onDestroy(): void { }

    destroy(): void {
        // 解绑父节点
        if (this.isDestroy) return;
        this.isDestroy = true;
        if (this.node) {
            this.node.removeComponent(this);
        }
        // this.setNode(null);
    };
}