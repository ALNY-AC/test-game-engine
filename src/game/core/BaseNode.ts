import Component from "./Component";
import Scene from "./components/Scene";
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
    scene?: Scene;

    /**
     * 此节点激活状态
     */
    active: Boolean = true;

    parent: BaseNode | null = null;

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

    setParent(parentNode: BaseNode | null): void {
        if (this.parent == parentNode) return;
        if (parentNode == null) {
            this.destroy();
            return
        }
        if (this.parent) {
            // 先删除，后添加
            this.parent
            this.parent = null;
        }

        parentNode.children.push(this);
        this.parent = parentNode;
    }
    getParent(): BaseNode | null {
        return this.parent;
    }

    addChild(childNode: BaseNode): void {
        childNode.setParent(this);
    }

    removeChild(node: Node): void {
        this.removeChildByUuid(node.uuid);
    }

    removeChildByName(nodeName: string): void {
        const index = this.children.findIndex(el => el.name == nodeName);
        if (index < 0) return;
        this.children.splice(index, 1);
    }

    removeChildByUuid(uuid: string): void {
        const index = this.children.findIndex(el => el.uuid == uuid);
        if (index < 0) return;
        this.children.splice(index, 1);
    }

    addComponent(comp: Component): void {
        this.components.push(comp);
        comp.setNode(this);
        comp.start();
    }

    getComponent<T extends Component>(className: any) {
        return this.components.find(el => el instanceof className);
    }

    removeComponent(className: Component) {
        this.removeComponentByUuid(className.uuid);
    }

    removeComponentByName(name: any) {
        const index = this.components.findIndex(el => el.name == name);
        if (index < 0) return;
        this.components.splice(index, 1);
    }

    removeComponentByUuid(uuid: any) {
        const index = this.components.findIndex(el => el.uuid == uuid);
        if (index < 0) return;
        this.components.splice(index, 1);
    }

    destroy() {
        // 解绑父节点
        if (this.isDestroy) return;
        this.isDestroy = true;
        if (this.parent) this.parent.removeChild(this);
        this.components.forEach(el => {
            el.destroy();
        });

        this.parent = null;

    }
}