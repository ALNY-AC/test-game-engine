import V2 from "../core/V2";
import Block from "./Block";
import Player from "./Player";

export default class Npc extends Block {

    speed: number = 500;
    targets: V2[] = [];
    target!: V2;
    velocity: V2 = new V2(0, 0);//速度
    player!: Player;
    dt: number = 0;
    dist: number = 0;

    start(): void {

        this.color = '#0f0';
    }
    update(dt: number): void {
        this.dt = dt;
        if (!this.player) this.player = <Player>this.game.find('player');
        // if (this.game.mouse.isDown) this.toPoint(new V2(this.game.mouse.x, this.game.mouse.y));
        if (this.target) this.move(dt);

    }
    moveTo(v2: V2): void {
        this.rotateTo(v2);
        this.toPoint(v2);
    }
    rotateTo(v2: V2) {
        let dx = v2.x - this.x;
        let dy = v2.y - this.y;
        let angle = Math.atan2(dy, dx);
        this.angle = angle;
    }
    toPoint(v2: V2): void {
        // 速度分量
        this.velocity = new V2(Math.cos(this.angle) * this.speed * this.dt, Math.sin(this.angle) * this.speed * this.dt);
        this.target = v2;
    }
    move(dt: number) {

        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        this.dist = Math.sqrt(dx * dx + dy * dy);
        if (this.dist > this.speed * dt) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        } else {
            // 当前时刻的位置加上速度后超过了当前目标点
            // 物体下一时刻将处于当前目标点的位置
            this.x = this.target.x;
            this.y = this.target.y;
        }
    }
    addPoint(v2: V2): void {

    }
    render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx);
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.x, this.y - 1.5, 100, 3);
        // if (this.target) {
        //     ctx.beginPath();
        //     ctx.strokeStyle = "#fff";
        //     ctx.lineWidth = 1;
        //     ctx.moveTo(this.x, this.y);
        //     ctx.lineTo(this.target.x, this.target.y);
        //     ctx.stroke();
        //     ctx.closePath();
        // }

    }

}