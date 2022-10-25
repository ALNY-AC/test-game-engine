import Block from "../components/Block";

export default class Zd extends Block {

    speed: number = 400;

    start(): void {
        this.w = 5;
        this.h = 5;
    }
    update(dt: number): void {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

}