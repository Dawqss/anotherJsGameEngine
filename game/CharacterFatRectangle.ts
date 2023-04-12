import {emptyPlayableKeyMap, PlayableObject} from "../src/PlayableCharacter";
import {GameObjectSizePosition, KeyboardArrows, RenderConfig} from "../src/types";
import {Vector2} from "../src/common";
import {Detection} from "../src/Detection";

export class CharacterFatRectangle extends PlayableObject {
    isCollisionDetectionEnabled = true;
    moveDeltaInMs = 16.6;
    // TODO: add probably this & acceleration
    multiplier: number = 2.5;
    private _acceleration: number = 0.1;

    constructor(public sizePosition: GameObjectSizePosition, public detection: Detection, public config: RenderConfig) {
        super(sizePosition, detection, config);
    }

    getRenderConfig = (): RenderConfig => {
        // this shit need to be changed or should be changed in recalulcate
        this.config.rect = {
            ...this.config.rect,
            width: this.sizePosition.width,
            height: this.sizePosition.height,
            positionX: this.sizePosition.positionX,
            positionY: this.sizePosition.positionY
        } as unknown as RenderConfig['rect'];

        return this.config;
    }

    recalculate() {
        // I think we should create some other function and wrap all of logic from here and got only in recalculate(vector: Vector2, resultOfDetection);
        const x = this.getXAxisFromKeyMap();
        const y = this.getYAxisFromKeyMap();
        this.updateAcceleration(x !== 0 || y !== 0);
        this.addVector(new Vector2(x, y));
        // we should extract this to other class eg. PlayerControls (should be abstract)
        const vector = {
            x: this.currentVector.x,
            y: this.currentVector.y
        };

        this.keyMap = emptyPlayableKeyMap;
        this.sizePosition.positionY += vector.y;
        this.sizePosition.positionX += vector.x;

        // get frames
        const frame = this.getFrameDetection();
        if (frame) {
            const something = this.detection.detectCollisions(frame);

            if (something.length) {
                console.log(' detected', something);
                this.config = {
                    rect: {
                        width: this.sizePosition.width,
                        height: this.sizePosition.height,
                        positionX: this.sizePosition.positionX,
                        positionY: this.sizePosition.positionY,
                        style: {
                            fill: `#${Math.floor(Math.random()*16777215).toString(16)}`
                        }
                    }
                }
            }
        }
    }

    getXAxisFromKeyMap = () => {
        let x = 0;

        if (this.keyMap[KeyboardArrows.ArrowLeft]) {
            x = x - 1;
        }

        if (this.keyMap[KeyboardArrows.ArrowRight]) {
            x = x + 1;
        }

        if (this.keyMap[KeyboardArrows.ArrowUp] || this.keyMap[KeyboardArrows.ArrowDown]) {
            x = x / 1.4
        }

        return x;
    }

    getYAxisFromKeyMap = () => {
        let y = 0;

        if (this.keyMap[KeyboardArrows.ArrowDown]) {
            y = y + 1;
        }

        if (this.keyMap[KeyboardArrows.ArrowUp]) {
            y = y - 1;
        }

        if (this.keyMap[KeyboardArrows.ArrowLeft] || this.keyMap[KeyboardArrows.ArrowRight]) {
            y = y / 1.4
        }

        return y;
    }

    private updateAcceleration(
        add: boolean,
        max: number = 2,
        acceleration: number = 2,
        deceleration: number = 5) {
            if (add) {
                if (this._acceleration < max) {
                    this._acceleration += acceleration/100;
                }
            } else {
                if (this._acceleration > 0) {
                    this._acceleration -= deceleration/100;
                }
            }
    }
}

