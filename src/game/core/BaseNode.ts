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

    setParent(parentNode: BaseNode): void {
        parentNode.children.push(this);
        this.parent = parentNode;
    }
    getParent(): BaseNode | null {
        return this.parent;
    }

    addChild(childNode: BaseNode): void {
        childNode.setParent(this);
    }

    addComponent(): void {
        // this.components.push('')
    }


}