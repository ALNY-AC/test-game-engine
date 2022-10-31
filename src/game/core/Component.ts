import Node from "./Node";
import IDGenerator from "./utils/IDGenerator";
const iDGenerator = new IDGenerator('Component');

export default class Component {

    node: Node | null = null;
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
    setNode(node: Node | null) {
        this.node = node;
    }
    getNode(): Node | null {
        return this.node;
    }

    start(): void { }
    update(): void { }
    onDestroy(): void { }

    destroy(): void {
        // 解绑父节点
        if (this.isDestroy) return;
        this.isDestroy = true;
        if (this.node) {
            this.node.removeComponent(this);
        }
        this.setNode(null);
    };
}