import {PlayableObject} from "../src/PlayableCharacter";
import {KeyboardArrows, RenderConfig} from "../src/types";

export class CharacterFatRectangle extends PlayableObject {
    getRenderConfig = (): RenderConfig => {
        // layers?? from top to bottom zIndex will be a problem probably hmmm (we will see)
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
        if (this.lastMove === KeyboardArrows.ArrowDown) {
            this.sizePosition.positionY -= 3
        }

        if (this.lastMove === KeyboardArrows.ArrowUp) {
            this.sizePosition.positionY -= 3
        }

        if (this.lastMove === KeyboardArrows.ArrowRight) {
            this.sizePosition.positionX += 3;
        }

        if (this.lastMove === KeyboardArrows.ArrowLeft) {
            this.sizePosition.positionX -= 3;
        }

        this.lastMove = undefined;
    }
}
