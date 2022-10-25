import V2 from "../core/V2";
import Zd from "../script/Zd";
import Block from "./Block";
import Camera from "./Camera";

export default class Player extends Block {

    speed: number = 200;

    zds: Zd[] = [];
    zdIndex = 0;
    zdTime = 0;
    zdCount = 20;
    zdTimeMax = 0.1;
    start(): void {
        // this.x = 500;
        // this.y = 500;
        this.zds = new Array(this.zdCount).fill('').map(el => new Zd('zd'));
        this.zds.forEach(zd => {
            this.game.addComponent(zd);
        });

        this.zdTime = this.zdTimeMax;
    }
    update(dt: number): void {


        if (this.zdTime >= this.zdTimeMax) {
            this.zdTime = this.zdTimeMax;
        } else {
            this.zdTime += dt;
        }
        // this.x = this.game.mouse.x;
        // this.y = this.game.mouse.y;
        const speed = this.speed * dt;
        // const easing = 0.05;
        let dx = this.game.mouse.wordX - this.x;
        let dy = this.game.mouse.wordY - this.y;
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
            camera.offsetX = -this.x;
            camera.offsetY = -this.y;
        }

        if (this.game.keys[32]) {
            if (this.zdTime >= this.zdTimeMax) {
                this.zdIndex++;
                if (this.zdIndex >= this.zds.length) {
                    this.zdTime = 0;
                    this.zdIndex = 0;
                }
                // let zd = new Zd();
                let zd = this.zds[this.zdIndex];
                zd.angle = this.angle;
                zd.x = this.x;
                zd.y = this.y;
                zd.velocity = new V2(Math.cos(zd.angle) * zd.speed * dt, Math.sin(zd.angle) * zd.speed * dt);
            }

            // this.game.addComponent(zd);
        }
    }
    render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x, this.y - 1.5, 30, 3);
    }

}