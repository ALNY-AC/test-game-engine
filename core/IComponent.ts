export default interface IComponent {
    load(): void;
    start(): void;
    update(dt: number): void;
    render(ctx: CanvasRenderingContext2D): void;
    destroy(): void;
}