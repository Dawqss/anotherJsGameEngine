import {GameObject} from "../src/GameObject";

export class RectangleBoxGround extends GameObject {
    isCollisionDetectionEnabled = true;

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

    getFrameDetection(): { x0: number; y0: number; x1: number; y1: number } {
        return {
            x0: this.sizePosition.positionX,
            y0: this.sizePosition.positionY,
            x1: this.sizePosition.positionX + this.sizePosition.width,
            y1: this.sizePosition.positionY + this.sizePosition.height,
        };
    }
}
