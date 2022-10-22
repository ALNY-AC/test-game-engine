import Block from "./Block";

export default class Player extends Block {

    speed: number = 1000;

    start(): void {
    }
    update(dt: number): void {
        // this.x = this.game.mouse.x;
        // this.y = this.game.mouse.y;
        const speed = this.speed * dt;
        // const easing = 0.05;


        if (this.game.keys[87]) {
            this.y -= speed;
        }
        if (this.game.keys[83]) {
            this.y += speed;
        }
        if (this.game.keys[65]) {
            this.x -= speed;
        }
        if (this.game.keys[68]) {
            this.x += speed;
        }
    }

}