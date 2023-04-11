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

    detectObject: any = undefined;

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

    update = (time = 0) => {
        const renderConfigs: RenderConfig[] = [];

        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += deltaTime;

        const frameDetect: DetectionFrame[] = [];

        this.resetBackground();

        // DETECTION

        for (let gameObject of this.gameObjects) {
            // should also create a matrix grid for detection system for character blocks
            // renderConfigs.push(gameObject.getRenderConfig());

            if (gameObject.isCollisionDetectionEnabled && gameObject.getFrameDetection) {
                frameDetect.push(gameObject.getFrameDetection())
            }
        }

        for (let playableObject of this.playableObjects) {
            if (this.dropCounter >= playableObject.moveDeltaInMs) {
                playableObject.recalculate();
                playableObject.update();
                frameDetect.push(playableObject.getFrameDetection());
            }
        }

        const detection = new Detection(frameDetect);

        if (detection.testKurwa()){
            this.playableObjects[0].bounce();
        }

        // END OF DETECTION

        for (let gameObject of this.gameObjects) {
            renderConfigs.push(gameObject.getRenderConfig());
        }

        for (let playableObject of this.playableObjects) {
            if (this.dropCounter >= playableObject.moveDeltaInMs) {
                renderConfigs.push(playableObject.getRenderConfig());
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

    addDetectObject = (object: any): void => {
        this.detectObject = object;
    }
}
