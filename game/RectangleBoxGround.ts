import {GameObject} from "../src/GameObject";

export class RectangleBoxGround extends GameObject {
    getRenderConfig(): any {
        return {
            rect: {
                width: this.initialSizePosition.width,
                height: this.initialSizePosition.height,
                positionX: this.initialSizePosition.positionX,
                positionY: this.initialSizePosition.positionY,
                style: {
                    fill: "#E1C16E"
                }
            }
        }
    }
}
