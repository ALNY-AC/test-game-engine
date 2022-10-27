import Scene from "../components/Scene";
import Component from "./Component";
import Node from "./Node";
import IDGenerator from "./utils/IDGenerator";
const iDGenerator = new IDGenerator('Node');
export default class BaseNode {

    /**
     * 此节点所有子节点
     */
    children: Node[] = [];

    /**
     * 节点的名称
     */
    name: string = '';

    /**
     * 此节点的唯一id
     */
    id: string = iDGenerator.getNewId();

    /**
     * 此节点所有的组件
     */
    components: Component[] = [];

    /**
     * 此节点所在的场景
     */
    scene?: Screen;

    /**
     * 此节点激活状态
     */
    active: Boolean = true;

    parent: BaseNode | null = null;

    get uuid() {
        return this.id;
    }

    constructor(name: string) {
        this.name = name;
    }

    setParent(parentNode: BaseNode): void {
        parentNode.children.push(this);
        this.parent = parentNode;
    }
    getParent(): BaseNode | null {
        return this.parent;
    }

    addChild(childNode: BaseNode): void {
        this.children.push(childNode);
        childNode.setParent(this);
    }

    removeChild(nodeName: string): void {
        const index = this.children.findIndex(el => el.name == nodeName);
        if (index < 0) return
        const child = this.children.splice(index, 1)[0];
        child.destroy();
    }

    addComponent(comp: Component): void {
        this.components.push(comp)
    }

    getComponent<T extends Component>(className: any) {
        this.components.find(el => el instanceof className);
    }

    removeComponent(className: any) {
        const index = this.children.findIndex(el => el.name == nodeName);
        if (index < 0) return
        const child = this.children.splice(index, 1)[0];
        child.destroy();
    }

    destroy() {
        this.parent = null;

    }

}