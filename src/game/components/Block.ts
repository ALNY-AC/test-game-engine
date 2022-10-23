import Component from "../core/Component";

export default class Block extends Component {


    start(): void {
        this.x = 300;
        this.y = 300;
    }
    update(dt: number): void {
    }
    render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w * 0.5, this.y - this.h * 0.5, this.w, this.h);
    }

}