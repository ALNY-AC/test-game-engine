import Scene from "./core/components/Scene";
import Node from "./core/Node";

export default class Game {

    width: number = 700;
    height: number = 700;
    $el: HTMLElement | null = null;
    $canvas: HTMLCanvasElement | null = null;
    ctx!: CanvasRenderingContext2D;
    startTime: number = 0;
    fpsTime: number = 0;
    frameCount: number = 0;
    fps: number = 0;
    scene: Scene | null = null;
    // renderQueue = null;

    init(elId: string) {
        // 
        this.$el = document.querySelector(elId);
        if (!this.$el) return;
        const canvas = document.createElement('canvas');
        this.$canvas = canvas;
        canvas.width = this.width;
        canvas.height = this.height;

        this.$el.appendChild(canvas);
        this.ctx = <CanvasRenderingContext2D>this.$canvas.getContext("2d");
        this.initEvent();

        this.scene = new Scene();
    }
    initEvent() {
        const canvas = this.$canvas!;

        canvas.addEventListener('mousemove', (e) => {

        });

        canvas.addEventListener('mousedown', (e) => {

        });

        canvas.addEventListener('mouseup', (e) => {
        });

        window.addEventListener('keydown', (e: KeyboardEvent) => {

        })

        window.addEventListener('keyup', (e: KeyboardEvent) => {
        })
    }
    run() {
        this.startTime = new Date().valueOf();
        this.animate();
    }
    animate(time: number = 0) {

        const now = new Date().valueOf();

        let dt = (now - this.startTime) / 1000;

        ++this.frameCount;
        this.fpsTime += dt;
        if (this.fpsTime > 1.0) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.fpsTime = 0.0;
        }
        this.startTime = now;
        this.tick(dt);
        this.render(this.ctx);
        requestAnimationFrame((time) => { this.animate(time) });
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        ctx.fillText(`FPS ${this.fps}`, 10, 20);
        ctx.restore();
        ctx.save();
        if (this.scene) this.scene.render(ctx);
        ctx.restore();

    }

    tick(dt: number) {

        if (!this.scene) return;
        this.loop(this.scene, dt);
    }

    loop(node: Node, dt: number = 0) {
        node.components.forEach(el => {
            el.update(dt);
        });
        node.children.forEach(el => {
            this.loop(el);
        })
    }
}