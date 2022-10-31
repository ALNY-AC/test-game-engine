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
        wordX: 0,
        wordY: 0,
        isDown: 0,
    };
    keys: any = {};
    polled: any = {};
    fps = 0;
    fpsPre = 0;
    time = 0;
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

            this.mouse.x = e.offsetX //- offsetX - this.sceneWidth * 0.5;
            this.mouse.y = e.offsetY //- offsetY - this.sceneHeight * 0.5;
            this.mouse.wordX = e.offsetX - offsetX - this.sceneWidth * 0.5;
            this.mouse.wordY = e.offsetY - offsetY - this.sceneHeight * 0.5;
        });

        this.el.addEventListener('mousedown', (e) => {
            // let dx = Math.floor(e.offsetX / w) * w;//e.offsetX 
            // let dy = Math.floor(e.offsetY / h) * h;//e.offsetY 
            // if (isDarwLine) {
            //     aiPathPoint.push([dx, dy]);
            //     localStorage.aiPathPoint = JSON.stringify(aiPathPoint);
            // }
            this.mouse.isDown = 1;

            let camera = <Camera>this.find('Camera');

            let offsetX = camera.offsetX;
            let offsetY = camera.offsetY;

            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.wordX = e.offsetX - offsetX - this.sceneWidth * 0.5;
            this.mouse.wordY = e.offsetY - offsetY - this.sceneHeight * 0.5;
        });

        this.el.addEventListener('mouseup', (e) => {
            this.mouse.isDown = 0;
        });

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            this.keys[e.keyCode] = true;
            // console.warn(e.keyCode);


        })

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            this.keys[e.keyCode] = false;
        })
    }
    find(compName = ''): Component | undefined {
        return this.components.find(el => el.name == compName);
    }

    finds(compName = ''): Component[] | undefined {
        return this.components.filter(el => el.name == compName);
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

        ctx.save();

        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        ctx.font = "14px Arial";
        ctx.fillText(`FPS ${this.fpsPre}`, 10, 20);
        ctx.restore();

        // ctx.translate(this.sceneWidth * 0.5, this.sceneHeight * 0.5)
        let camera = <Camera>this.find('Camera');
        let cameraOffsetX = camera.offsetX;
        let cameraOffsetY = camera.offsetY;
        let offsetX = cameraOffsetX + this.sceneWidth * 0.5;
        let offsetY = cameraOffsetY + this.sceneHeight * 0.5;
        ctx.translate(offsetX, offsetY);

        this.components.forEach(comp => {
            ctx.save();
            let compOffsetX = comp.x //+ comp.w * 0.5;
            let compOffsetY = comp.y //+ comp.h * 0.5;

            // ctx.save();
            ctx.translate(compOffsetX, compOffsetY);
            ctx.rotate(comp.angle);
            ctx.translate(-compOffsetX, -compOffsetY);

            // ctx.translate(offsetX + comp.x, offsetY + comp.y);
            // ctx.translate(compOffsetX - comp.w * 0.5 - comp.x, compOffsetY - comp.h * 0.5 - comp.y);
            comp.render(ctx);
            // ctx.restore();

            // ctx.translate(-(compOffsetX - comp.w * 0.5 - comp.x), -(compOffsetY - comp.h * 0.5 - comp.y));

            // ctx.translate(-(offsetX - comp.x), -(offsetY - comp.y));


            ctx.restore();

        });

    }
    addComponent(comp: Component) {
        comp.game = this;
        this.components.push(comp);
        comp.start();
    }
    remove(comp: Component) {
        this.components = this.components.filter(el => el.uuid != comp.uuid);
    }
    animate(time: number = 0) {
        this.timeDt = (time - this.timeA) / 1000;
        this.timeA = time;
        this.time += this.timeDt;
        if (this.time >= 1) {
            this.fpsPre = this.fps;
            this.fps = 0;
            this.time = 0;
        }
        this.fps++;
        // console.warn(this.fps);

        // if(){}
        this.update(this.timeDt);
        this.ctx.save();
        this.render(this.ctx);
        this.ctx.restore();
        requestAnimationFrame((time) => { this.animate(time) });
    }
    //   // Combine vertex information, unit information, anchor points, extrude and even customOutline to generate the actual vertices used
    //   protected _updateMeshVertices () {
    //     // Start generating the Geometry information to generate the mesh
    //     temp_matrix.identity();

    //     const units = 1 / this._pixelsToUnit;
    //     const temp_vec3 = new Vec3(units, units, 1);
    //     temp_matrix.scale(temp_vec3);
    //     const PosX = -(this._pivot.x - 0.5) * this.rect.width * units;
    //     const PosY = -(this._pivot.y - 0.5) * this.rect.height * units;
    //     temp_vec3.set(PosX, PosY, 0);
    //     temp_matrix.translate(temp_vec3);
    //     const vertices = this.vertices!;

    //     for (let i = 0; i < vertices.rawPosition.length; i++) {
    //         const pos = vertices.rawPosition[i];
    //         Vec3.transformMat4(temp_vec3, pos, temp_matrix);
    //         Vec3.toArray(vertices.positions, temp_vec3, 3 * i);
    //     }
    //     Vec3.transformMat4(this._minPos, vertices.minPos, temp_matrix);
    //     Vec3.transformMat4(this._maxPos, vertices.maxPos, temp_matrix);
    // }

}