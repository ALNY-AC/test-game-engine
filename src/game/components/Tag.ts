import Component from "../core/Component";
import Block from "./Block";
import Npc from "./Npc";
import Player from "./Player";

export default class Tag extends Component {


    blocks: Block[] = [];

    start(): void {
    }
    update(dt: number): void {

        this.blocks = [
            ...this.game.components.filter(comp => comp instanceof Player),
            ...this.game.components.filter(comp => comp instanceof Npc)
        ];

    }
    render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx);
        this.blocks.forEach(block => {
            ctx.fillStyle = "#ffff00";
            ctx.textAlign = "center";
            ctx.font = "14px Arial";
            ctx.fillText(block.name, block.x + block.w / 2, block.y - 20);
            ctx.beginPath();
            ctx.strokeStyle = "#fff"
            ctx.lineWidth = 1
            ctx.moveTo(block.x, block.y);
            let height = 45;
            let width = 130;
            ctx.lineTo(block.x - height, block.y - height);
            ctx.lineTo(block.x - height - width, block.y - height);
            ctx.stroke();
            ctx.closePath();

            ctx.textAlign = "left";
            ctx.font = "12px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText(`(x:${block.x.toFixed(2)},y:${block.y.toFixed(2)})`, block.x - height - width, block.y - height - 10);
        })

    }

}