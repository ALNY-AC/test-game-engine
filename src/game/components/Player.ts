import Block from "./Block";
import Camera from "./Camera";

export default class Player extends Block {

    speed: number = 300;

    start(): void {
    }
    update(dt: number): void {
        // this.x = this.game.mouse.x;
        // this.y = this.game.mouse.y;
        const speed = this.speed * dt;
        // const easing = 0.05;
        let dx = this.game.mouse.x - this.x;
        let dy = this.game.mouse.y - this.y;
        this.angle = Math.atan2(dy, dx);

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
        let camera = <Camera>this.game.find('Camera');
        if (camera) {
            camera.offsetX = this.x;
            camera.offsetY = this.y;
        }

    }
    render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x, this.y - 1.5, 100, 3);
    }

}