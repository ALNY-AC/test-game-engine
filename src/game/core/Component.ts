import Game from "../Game";
import IComponent from "./IComponent";
import V2 from "./V2";

export default class Component implements IComponent {
    name: string = '';
    game!: Game;
    x = 0;
    y = 0;
    w = 20;
    h = 20;
    velocity: V2 = new V2(0, 0);//速度
    color = '#ffffff';
    angle = 0;
    constructor(name: string = 'Component') {
        this.name = name;
        this.load();
    }
    load(): void { }
    start(): void { }
    update(dt: number): void { }
    render(ctx: CanvasRenderingContext2D): void { }

}