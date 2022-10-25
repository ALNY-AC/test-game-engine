import Component from "../core/Component";
import Player from "./Player";

export default class Camera extends Component {
    offsetX = 0;
    offsetY = 0;
    speed = 500;

    update(dt: number): void {
        const speed = this.speed * dt;

        // 38
        // 40
        // 37
        // 39

        // let player = <Player>this.game.find('player');

        // if (player) {
        //     this.offsetX = player.x;
        //     this.offsetY = player.y;
        // }

        // if (this.game.keys[38]) {
        //     this.offsetY -= speed;
        // }
        // if (this.game.keys[40]) {
        //     this.offsetY += speed;
        // }
        // if (this.game.keys[37]) {
        //     this.offsetX -= speed;
        // }
        // if (this.game.keys[39]) {
        //     this.offsetX += speed;
        // }
    }

}