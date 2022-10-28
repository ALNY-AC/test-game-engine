import Component from "../core/Component";

export default class Block extends Component {


    start(): void {
    }
    update(dt: number): void {
    }
    render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

}