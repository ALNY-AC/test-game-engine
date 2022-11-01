import Model from "../Model";
import Node from "../Node";
import Vec2 from "../Vec2";

export default class Scene extends Node {

    nodes: Node[] = [];

    update() {
        this.nodes = [];
    }

    render(ctx: CanvasRenderingContext2D) {

        this.nodes.forEach((node: Node) => {

            ctx.save();
            ctx.translate(node.x, node.y);
            ctx.beginPath(); //新建一条path
            ctx.moveTo(0, 0); //把画笔移动到指定的坐标
            ctx.strokeStyle = node.model.color;
            node.model.vertexs.forEach((v: Vec2) => {
                ctx.lineTo(v.x, v.y);
            })
            ctx.closePath();
            ctx.stroke(); //绘制路径。
            // ctx.fill()
            ctx.restore();
            ctx.translate(-node.x, -node.y);
        })
    }
    /**
     * 提交渲染，每帧提交。
     */
    submitModel(node: Node) {
        this.nodes.push(node);
    }
}