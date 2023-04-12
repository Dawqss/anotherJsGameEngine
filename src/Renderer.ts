import {GameObject} from "./GameObject";
import {DetectionFrame, RenderConfig} from "./types";
import {PlayableObject} from "./PlayableCharacter";
import {Detection} from "./Detection";

export class Renderer {
    canvasElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    animationFrameHandlerId: number | undefined;

    lastTime = 0;
    dropCounter = 0;

    constructor(private scale: {x: number, y: number}, private gameObjects: GameObject[], private playableObjects: PlayableObject[]) {
        this.canvasElement = document.createElement('canvas');
        this.canvasElement.width = window.innerWidth;
        this.canvasElement.height = window.innerHeight;
        document.body.appendChild(this.canvasElement);

        this.ctx = this.canvasElement.getContext('2d')!;
        this.ctx.scale(scale.x, scale.y);
    }

    resetBackground = () => {
        const {width, height } = this.canvasElement;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, width, height);
    }

    render = (configs: RenderConfig[]) => {
        // some config to render all gameObjects (only not background)
        // here should be a tree crwaling function but now its super easy provider

        for (let config of configs) {
            // should be encapsulated in smaller function eg. ifRect?
            if (config.rect) {
                const {width, height, positionX, positionY, style: rectStyle} = config.rect;

                if (rectStyle) {
                    if (rectStyle.fill) {
                        this.ctx.fillStyle = rectStyle.fill;
                        this.ctx.fillRect(positionX, positionY, width, height);
                    }
                }
            }
        }
    }

    // This is gameLoop
    update = (time = 0) => {
        const renderConfigs: RenderConfig[] = [];

        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += deltaTime;

        // zamiast tego ładowanie tła z jakiejs classy level pewnie
        this.resetBackground();


        for (let gameObject of [...this.gameObjects, ...this.playableObjects]) {
            if (gameObject instanceof PlayableObject) {
                if (this.dropCounter >= gameObject.moveDeltaInMs) {
                    gameObject.recalculate();
                    gameObject.update();
                    renderConfigs.push(gameObject.getRenderConfig());
                }
            }

            if (gameObject instanceof GameObject && gameObject.isCollisionDetectionEnabled && gameObject.getFrameDetection) {
                renderConfigs.push(gameObject.getRenderConfig());
            }
        }

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
