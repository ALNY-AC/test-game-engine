import BaseNode from "./BaseNode";
import Vec2 from "./Vec2";

export default class Node extends BaseNode {

    // Vec2
    position: Vec2 = new Vec2(0, 0);
    rotation: number = 0;
    scale: number = 0;
    width: number = 0;
    height: number = 0;
    group: string = '';
    zIndex: number = 0;
    color: string = '#FFFFFF';

    get x() { return this.position.x }
    get y() { return this.position.y }

    set x(v) { this.position.x = v }
    set y(v) { this.position.y = v }

}