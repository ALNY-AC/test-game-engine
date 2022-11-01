import Component from "../Component";
import Node from "../Node";
import Vec2 from "../Vec2";

export default class Cube extends Component {

    start(): void {
        this.node.model.vertexs = [
            new Vec2(0, 0),
            new Vec2(20, 0),
            new Vec2(20, 20),
            new Vec2(0, 20),
        ]
        this.node.x = 500;
        this.node.y = 500;

    }

    update(dt: number) {


        this.node.scene?.submitModel(this.node);
    }
}