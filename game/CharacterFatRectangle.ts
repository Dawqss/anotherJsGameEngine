import {emptyPlayableKeyMap, PlayableObject} from "../src/PlayableCharacter";
import {KeyboardArrows, RenderConfig} from "../src/types";

export class CharacterFatRectangle extends PlayableObject {
    moveDeltaInMs = 16.6;
    // TODO: add probably this & acceleration
    multiplier: number = 2.5;
    private _acceleration: number = 0.1;

    getRenderConfig = (): RenderConfig => {
        this.config = {
            rect: {
                width: this.sizePosition.width,
                height: this.sizePosition.height,
                positionX: this.sizePosition.positionX,
                positionY: this.sizePosition.positionY,
                style: {
                    fill: "#1e4800"
                }
            }
        }

        return this.config;
    }

    recalculate() {
        const x = this.getXAxisFromKeyMap();
        const y = this.getYAxisFromKeyMap();
        if (x !== 0 || y !== 0) {
            this.updateAcceleration(true);
        }else {
            this.updateAcceleration(false);
        }
        // we should extract this to other class eg. PlayerControls (should be abstract)
        const vector = {
            x: x * this.multiplier * this._acceleration,
            y: y * this.multiplier * this._acceleration
        };

        this.keyMap = emptyPlayableKeyMap;
        this.sizePosition.positionY += vector.y;
        this.sizePosition.positionX += vector.x;
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
        max: number = 1,
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

