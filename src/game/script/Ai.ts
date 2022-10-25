import Npc from "../components/Npc";
import Component from "../core/Component";
import V2 from "../core/V2";

export default class Ai extends Component {



    npcs: Npc[] = [];

    start(): void {

    }

    update(dt: number): void {
        this.npcs = <Npc[]>this.game.finds('npc');
        if (this.game.mouse.isDown) {
            // 鼠标按下，计算阵型

            this.npcs.forEach((el, i) => {
                let v2 = new V2(this.game.mouse.x, this.game.mouse.y);
                v2.x += i * 40;
                el.moveTo(v2)
            });
        }

    }

}