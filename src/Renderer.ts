import {GameObject} from "./GameObject";
import {RenderConfig} from "./types";
import {PlayableObject} from "./PlayableCharacter";

export class Renderer {
    canvasElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    animationFrameHandlerId: number | undefined;

    lastTime = 0;
    dropCounter = 0;

    moveDeltaInMs = 600;

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

        const frameDetect = [];

        this.resetBackground();

        // wyliczana detekecja, overlapping matrixow 2 wymiarowych,
        // tworzony obiekt z informacja jaki obiekt styka sie z jaka scianka twojego obiektu
        // w jakich miejscach jesszcze moznda dodac

        for (let gameObject of this.gameObjects) {
            // should also create a matrix grid for detection system for character blocks
            renderConfigs.push(gameObject.getRenderConfig());

            if (gameObject.isCollisionDetectionEnabled && gameObject.getFrameDetection) {
                frameDetect.push(gameObject.getFrameDetection())
            }
        }

        // renderConfig should be created from calculation based on provided gameObjects
        // some sorting and they dependency injection?

        // Move handler I guess cause it run in 600ms interval so here you should run function that only should trigger
        // on character movement or should run each 600ms
        // I think we can add more interval elements functions eg. animation?
        // (own dropCounter in class that will be check with lastTime from renderer?)

        console.log(frameDetect);

        if (this.dropCounter >= this.moveDeltaInMs) {
            for (let playableObject of this.playableObjects) {
                // there should be detection checking here probably too
                playableObject.recalculate();
                renderConfigs.push(playableObject.getRenderConfig())
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

