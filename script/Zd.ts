import Block from "../components/Block";

export default class Zd extends Block {

    speed: number = 1000;
    time = 0;


    start(): void {
        this.w = 5;
        this.h = 5;
    }
    update(dt: number): void {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.time += dt;
        if (this.time >= 3) {
            this.destroy();
        }
    }

}