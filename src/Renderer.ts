import {GameObject} from "./GameObject";
import {Config} from "./types";

export class Renderer {
    canvasElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    animationFrameHandlerId: number | undefined;

    lastTime = 0;
    dropCounter = 0;

    moveDeltaInMs = 600;

    constructor(private canvasId: string, private scale: {x: number, y: number}, private gameObjects: GameObject[]) {
        this.canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvasElement.getContext('2d')!;
        this.ctx.scale(scale.x, scale.y);
    }

    resetBackground = () => {
        // load last background probably get it from "Level class"
    }

    render = (configs: Config[]) => {
        // some config to render all gameObjects (only not background)
        // here should be a tree crwaling function but now its super easy provider

        for (let config of configs) {
            // should be encapsulated in smaller function eg. ifRect?
            if (config.rect) {
                const {width, height, positionX, positionY, style: rectStyle} = config.rect;
                if (rectStyle) {
                    if (rectStyle.fill) {
                        this.ctx.fillRect(positionX, positionY, width, height);
                    }
                }
            }
        }
    }

    update = (time = 0) => {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += deltaTime;

        const renderConfigs: Config[] = [];


        // renderConfig should be created from calculation based on provided gameObjects
        // some sorting and they dependency injection?

        // Move handler I guess cause it run in 600ms interval so here you should run function that only should trigger
        // on character movement or should run each 600ms
        // I think we can add more interval elements functions eg. animation?
        // (own dropCounter in class that will be check with lastTime from renderer?)

        if (this.dropCounter >= this.moveDeltaInMs) {

        }

        for (let gameObject of this.gameObjects) {
            // should also create a matrix grid for detection system for character blocks
            renderConfigs.push(gameObject.getRenderConfig());
        }

        this.resetBackground();
        this.render(renderConfigs);

        this.animationFrameHandlerId = requestAnimationFrame(this.update);
    };

    start = () => {
        this.update();
    }

    stop = () => {
        if (this.animationFrameHandlerId === undefined) {
            return;
        }

        cancelAnimationFrame(this.animationFrameHandlerId);
    }
}

