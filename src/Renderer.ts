type Config = any; // to be created

export class Renderer {
    canvasElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    lastTime = 0;
    // probably should be in constructor
    moveDeltaInMs = 600;
    dropCounter = 0;

    constructor(private canvasId: string, private scale: {x: number, y: number}) {
        this.canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvasElement.getContext('2d')!;
        this.ctx.scale(scale.x, scale.y);
    }

    resetBackground() {
        // load last background probably get it from "Level class"
    }

    render(config: Config) {
        // some config to render all gameObjects (only not background)
    }

    update(time = 0) {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.dropCounter += deltaTime;

        const renderConfig = {}
        // renderConfig should be created from calculation based on provided gameObjects
        // some sorting and they dependency injection?

        this.resetBackground();

        this.render(renderConfig);
    };

    start() {
        requestAnimationFrame(this.update);
    }
}

