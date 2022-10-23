import Component from "../core/Component";

export default class Scene extends Component {

    cellW = 20;
    cellH = 20;

    update(dt: number): void {

    }
    render(ctx: CanvasRenderingContext2D): void {

        for (let i = 0; i < window.innerWidth / this.cellW; i++) {
            ctx.strokeStyle = "#333333"
            ctx.beginPath();
            //定义开始坐标 startX-横坐标 startY-纵坐标 (必填)
            ctx.moveTo(i * this.cellW, 0);
            //定义开始坐标 endX-横坐标 endY-纵坐标 (必填)
            ctx.lineTo(i * this.cellW, window.innerHeight);
            //绘制线条(必填)
            ctx.stroke();
            //文字对齐方式 start、end、center、left、right(选填)wssw
            // ctx.textAlign = "start"
            //设置字体和尺寸 (必填)

            //填充文字 x-横坐标 y-纵坐标 (必填)
            ctx.fillStyle = "#666666";
            ctx.font = "12px";
            ctx.fillText((i * this.cellW) + '', i * this.cellH, 14);
            ctx.closePath();
        }

        for (let i = 0; i < window.innerHeight / this.cellH; i++) {
            ctx.strokeStyle = "#333333"
            ctx.beginPath();
            //定义开始坐标 startX-横坐标 startY-纵坐标 (必填)
            ctx.moveTo(0, i * this.cellH);
            //定义开始坐标 endX-横坐标 endY-纵坐标 (必填)
            ctx.lineTo(window.innerWidth, i * this.cellH);
            //绘制线条(必填)
            ctx.stroke();

            //填充文字 x-横坐标 y-纵坐标 (必填)
            ctx.fillStyle = "#666666";
            ctx.font = "12px";
            ctx.fillText((i * this.cellH) + '', 0, i * this.cellH);
            ctx.closePath();
        }

    }

}