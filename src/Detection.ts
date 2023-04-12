import {Grid} from "./Grid";
import {DetectionFrame} from "./types";

export class Detection {
    private grid: Grid;

    constructor(public detectionFrames: DetectionFrame[], cellSize: number) {
        this.grid = new Grid(cellSize);
        this.detectionFrames.forEach(frame => this.grid.insert(frame));
    }

    aabbCollision(rect1: DetectionFrame, rect2: DetectionFrame) {
        return (
            rect1.x0 < rect2.x1 &&
            rect1.x1 > rect2.x0 &&
            rect1.y0 < rect2.y1 &&
            rect1.y1 > rect2.y0
        );
    }

    detectCollisions(): void {
        this.detectionFrames.forEach(frame => {
            const potentialCollisions = this.grid.query(frame);
            potentialCollisions.forEach(potentialCollision => {
                if (frame !== potentialCollision && this.aabbCollision(frame, potentialCollision)) {
                    console.log(`Collision detected between ${frame.id} and ${potentialCollision.id}`);
                }
            });
        });
    }
}
