export default class Game {

    width: number = 700;
    height: number = 700;
    $el: HTMLElement | null = null;
    $canvas: HTMLCanvasElement | null = null;
    ctx!: CanvasRenderingContext2D;

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

}