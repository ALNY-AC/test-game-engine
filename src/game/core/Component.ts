import Game from "../Game";
import IComponent from "./IComponent";

export default class Component implements IComponent {
    game!: Game;
    x = 0;
    y = 0;
    w = 30;
    h = 30;
    color = '#ffffff';
    angle = 0;
    constructor() {
        this.load();
    }
    load(): void { }
    start(): void { }
    update(dt: number): void { }
    render(ctx: CanvasRenderingContext2D): void { }
}