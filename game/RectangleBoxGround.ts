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
            },
        }
    }

    recalculate() {
        const frame = this.getFrameDetection();
        if (frame) {
            console.log('frame', frame);
            // const something = this.detection.detectCollisions(frame);
            // console.log(something);
        }
    }
}
