import {emptyPlayableKeyMap, PlayableObject} from "../src/PlayableCharacter";
import {KeyboardArrows, RenderConfig} from "../src/types";

export class CharacterFatRectangle extends PlayableObject {
    moveDeltaInMs = 16.6;
    // TODO: add probably this & acceleration
    multiplier: number = 2.5;

    getRenderConfig = (): RenderConfig => {
        this.config = {
            rect: {
                width: this.sizePosition.width,
                height: this.sizePosition.height,
                positionX: this.sizePosition.positionX,
                positionY: this.sizePosition.positionY,
                style: {
                    fill: "#00ff00"
                }
            }
        }

        return this.config;
    }

    recalculate() {
        // we should extract this to other class eg. PlayerControls (should be abstract)
        const vector = {
            x: this.getXAxisFromKeyMap() * this.multiplier,
            y: this.getYAxisFromKeyMap() * this.multiplier
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


}

