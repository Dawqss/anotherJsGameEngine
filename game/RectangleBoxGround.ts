import {GameObject} from "../src/GameObject";

export class RectangleBoxGround extends GameObject {
    getRenderConfig(): any {
        return {
            rect: {
                width: this.sizePosition.width,
                height: this.sizePosition.height,
                positionX: this.sizePosition.positionX,
                positionY: this.sizePosition.positionY,
                style: {
                    fill: "#E1C16E"
                }
            }
        }
    }
}
