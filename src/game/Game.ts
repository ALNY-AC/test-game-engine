import Camera from "./components/Camera";
import Scene from "./components/Scene";
import Component from "./core/Component";

export default class Game {
    el!: HTMLCanvasElement;
    sceneWidth = 0;
    sceneHeight = 0;
    timeA = 0;
    timeDt = 0;
    ctx!: CanvasRenderingContext2D;
    mainScene!: Scene;
    components: Component[] = [];
    mouse = {
        x: 0,
        y: 0,
        isDown: 0,
    };
    keys: any = {};
    polled: any = {};
    // static 
    run() {
        if (!this.el) return;
        this.ctx = <CanvasRenderingContext2D>this.el.getContext("2d");
        this.sceneWidth = this.el.width;
        this.sceneHeight = this.el.height;
        this.initEvent();
        this.animate();
    }
    initEvent() {

        this.el.addEventListener('mousemove', (e) => {

            let camera = <Camera>this.find('Camera');

            let offsetX = camera.offsetX;
            let offsetY = camera.offsetY;

            this.mouse.x = e.offsetX - offsetX //- this.sceneWidth * 0.5;
            this.mouse.y = e.offsetY - offsetY //- this.sceneHeight * 0.5;
        });

        this.el.addEventListener('mousedown', (e) => {
            // let dx = Math.floor(e.offsetX / w) * w;//e.offsetX 
            // let dy = Math.floor(e.offsetY / h) * h;//e.offsetY 
            // if (isDarwLine) {
            //     aiPathPoint.push([dx, dy]);
            //     localStorage.aiPathPoint = JSON.stringify(aiPathPoint);
            // }
            this.mouse.isDown++;
            // clickPoint = [];
            // clickPoint.push([dx, dy]);
        });

        this.el.addEventListener('mouseup', (e) => {
            this.mouse.isDown = 0;
        });

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            this.keys[e.keyCode] = true;

        })

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            this.keys[e.keyCode] = false;
        })
    }
    find(compName = ''): Component | undefined {
        return this.components.find(el => el.name == compName);
    }
    poll() {
        Object.keys(this.keys).forEach((k) => {
            if (!this.polled[k]) this.polled[k] = 0;
            if (this.keys[k]) {
                this.polled[k]++;
            } else {
                this.polled[k] = 0;
            }
        })
    }
    update(dt: number = 0) {
        this.poll();
        this.components.forEach(comp => {
            comp.update(dt);
        });
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.sceneWidth, this.sceneHeight);
        ctx.restore();
        // ctx.translate(this.sceneWidth * 0.5, this.sceneHeight * 0.5)
        let camera = <Camera>this.find('Camera');
        let offsetX = camera.offsetX;
        let offsetY = camera.offsetY;
        ctx.translate(offsetX, offsetY)
        this.components.forEach(comp => {
            ctx.save();
            ctx.translate(comp.x, comp.y);
            ctx.rotate(comp.angle);
            ctx.translate(-(comp.x), -(comp.y));

            comp.render(ctx);
            ctx.restore();

        });
    }
    addComponent(comp: Component) {
        comp.game = this;
        this.components.push(comp);
        comp.start();
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