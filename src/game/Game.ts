export default class Game {
    el!: HTMLCanvasElement;
    sceneWidth = 0;
    sceneHeight = 0;
    timeA = 0;
    timeDt = 0;
    ctx!: CanvasRenderingContext2D;
    run() {
        if (!this.el) return;
        this.ctx = <CanvasRenderingContext2D>this.el.getContext("2d");
        this.sceneHeight = this.el.height;
        this.animate();
    }
    update(dt: number = 0) {

    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    animate(time: number = 0) {
        this.timeDt = (time - this.timeA) / 1000;
        this.timeA = time;
        this.update(this.timeDt);
        this.ctx.save();
        this.render(this.ctx);
        this.ctx.restore();
        requestAnimationFrame((time) => { this.animate(time) });
    }
}