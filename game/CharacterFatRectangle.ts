import {PlayableObject} from "../src/PlayableCharacter";

export class CharacterFatRectangle extends PlayableObject {
    getRenderConfig(): any {
        // layers?? from top to bottom zIndex will be a problem probably hmmm (we will see)

        return {
            rect: {
                width: this.initialSizePosition.width,
                height: this.initialSizePosition.height,
                positionX: this.initialSizePosition.positionX,
                positionY: this.initialSizePosition.positionY,
                style: {
                    fill: "#00ff00"
                }
            }
        }
    }
}
