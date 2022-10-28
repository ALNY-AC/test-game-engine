import Npc from "../components/Npc";
import Component from "../core/Component";
import V2 from "../core/V2";

export default class Ai extends Component {



    npcs: Npc[] = [];

    start(): void {
        this.npcs = <Npc[]>this.game.finds('npc');

    }

    update(dt: number): void {

        if (this.game.mouse.isDown == 1) {
            // 鼠标按下，计算阵型
            this.npcs.forEach((el, i) => {
                let v2 = new V2(this.game.mouse.wordX, this.game.mouse.wordY);
                v2.x += i * 40;
                el.moveTo(v2)
            });
        }
    }
    render(ctx: CanvasRenderingContext2D): void {
        this.npcs.forEach((npc, i) => {
            if (!npc.target) return;
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,0.5)"
            ctx.lineWidth = 1
            ctx.moveTo(npc.x, npc.y);
            ctx.lineTo(npc.target.x, npc.target.y);
            ctx.stroke();
            ctx.closePath();
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(npc.target.x - 2.5, npc.target.y - 2.5, 5, 5);
        });
    }


}