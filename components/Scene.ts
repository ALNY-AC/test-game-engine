import Component from "../core/Component";
import Camera from "./Camera";

export default class Scene extends Component {

    cellW = 20;
    cellH = 20;


    point = [];

    update(dt: number): void {



    }
    render(ctx: CanvasRenderingContext2D): void {


        let camera = <Camera>this.game.find('Camera');

        let cameraOffsetX = camera.offsetX;
        let cameraOffsetY = camera.offsetY;
        let offsetX = cameraOffsetX + this.game.sceneWidth * 0.5;
        let offsetY = cameraOffsetY + this.game.sceneHeight * 0.5;

        let w = this.game.sceneWidth * 0.5 + -cameraOffsetX;
        let h = this.game.sceneHeight * 0.5 + -cameraOffsetY;


        let strokeStyle = "rgba(255,255,255,0.3)";
        let strokeStyle2 = "rgba(255,255,255,0.5)";
        let textColor = "rgba(255,255,255,0.6)";

        let right = w / this.cellW;
        let bottom = h / this.cellH;
        let left = -(w / this.cellW + offsetX);
        let top = -(h / this.cellH + offsetY);

        for (let i = 0; i < right; i++) {
            let x = i * this.cellW;

            ctx.save();
            ctx.beginPath();
            if (x % 100 == 0) {
                ctx.strokeStyle = strokeStyle2;

                ctx.fillStyle = textColor;
                ctx.font = "12px";
                ctx.fillText(x + '', x, 0);
            } else {
                ctx.strokeStyle = strokeStyle
            }
            ctx.moveTo(x, h);
            ctx.lineTo(x, -offsetY);
            ctx.stroke();
            ctx.restore();


        }


        for (let i = 0; i >= left; i--) {
            ctx.fillStyle = '#f0f';
            let x = i * this.cellW;

            ctx.save();

            ctx.beginPath();
            if (x % 100 == 0) {
                ctx.strokeStyle = strokeStyle2;

                ctx.fillStyle = textColor;
                ctx.font = "12px";
                ctx.fillText(x + '', x, 0);
            } else {
                ctx.strokeStyle = strokeStyle
            }
            ctx.moveTo(x, h);
            ctx.lineTo(x, -offsetY);
            ctx.stroke();

            ctx.restore();


        }


        for (let i = 0; i < bottom; i++) {
            ctx.fillStyle = '#f0f';
            let y = i * this.cellH;

            ctx.save();
            ctx.beginPath();
            if (y % 100 == 0) {
                ctx.strokeStyle = strokeStyle2;

                ctx.fillStyle = textColor;
                ctx.font = "12px";
                ctx.fillText(y + '', 0, y);
            } else {
                ctx.strokeStyle = strokeStyle
            }
            ctx.moveTo(w, y);
            ctx.lineTo(-offsetX, y);
            ctx.stroke();
            ctx.restore();


        }

        for (let i = 0; i >= top; i--) {
            ctx.fillStyle = '#f0f';
            let y = i * this.cellH;

            ctx.save();
            ctx.beginPath();
            if (y % 100 == 0) {
                ctx.strokeStyle = strokeStyle2;

                ctx.fillStyle = textColor;
                ctx.font = "12px";
                ctx.fillText(y + '', 0, y);
            } else {
                ctx.strokeStyle = strokeStyle
            }
            ctx.moveTo(w, y);
            ctx.lineTo(-offsetX, y);
            ctx.stroke();
            ctx.restore();


        }


        // for (let i = 0; i < this.game.sceneWidth / this.cellW; i++) {
        //     ctx.fillStyle = '#ff0';
        //     // console.warn(this.game.sceneWidth / this.cellW);
        //     // ctx.fillRect(-offsetX + i * this.cellW, -offsetY, 10, 10);
        //     ctx.beginPath();
        //     ctx.moveTo(-offsetX + i * this.cellW, 0);
        //     ctx.lineTo(-offsetX + i * this.cellW, this.game.sceneHeight);
        //     ctx.stroke();

        //     ctx.fillStyle = "#fff";
        //     ctx.font = "12px";
        //     ctx.fillText(-offsetX + i * this.cellW + '', -offsetX + i * this.cellW, -offsetY + 30);

        // }
        // 右
        // ctx.fillStyle = '#f0f';
        // // ctx.fillRect(-offsetX + this.game.sceneWidth - 30, -offsetY, 30, 30);



        // // 下
        // ctx.fillStyle = '#00f';
        // ctx.fillRect(offsetX - 30, offsetY - 30, 30, 30);


        // // 左
        // ctx.fillStyle = '#0ff';
        // ctx.fillRect(-offsetX, offsetY - 30, 30, 30);




        return
        // let camera = <Camera>this.game.find('Camera');

        // let cameraOffsetX = camera.offsetX;
        // let cameraOffsetY = camera.offsetY;
        // let offsetX = cameraOffsetX + this.game.sceneWidth * 0.5;
        // let offsetY = cameraOffsetY + this.game.sceneHeight * 0.5;

        for (let i = -cameraOffsetX; i < window.innerWidth / this.cellW; i++) {
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
            ctx.fillText((i * this.cellW) + '', i * this.cellH, 10);
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
            ctx.fillText((i * this.cellH) + '', 0, i * this.cellH + 10);
            ctx.closePath();
        }

    }

}