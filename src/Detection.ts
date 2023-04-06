import {DetectionFrame, GameObjectSizePosition} from "./types";

export class Detection {
    constructor(public detectionFrames: DetectionFrame[]) {}

    aabbCollision(rect1: DetectionFrame, rect2: DetectionFrame) {
        return (
            rect1.x0 < rect2.x1 &&
            rect1.x1 > rect2.x0 &&
            rect1.y0 < rect2.y1 &&
            rect1.y1 > rect2.y0
        );
    }

    testKurwa() {
        const [el1, el2] = this.detectionFrames;

        if (this.detectionFrames.length >= 2 && this.aabbCollision(el1, el2)) {
            console.warn(this.aabbCollision(el1, el2));
        }
    }
}

