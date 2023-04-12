import Quadtree, { Rect as QuadRect } from '@timohausmann/quadtree-js';
import {DetectionFrame, DetectionQuadFrame} from "./types";
import {detectionFrameToQuadRect} from "./utils/detectionFrameToQuadRect";
import {quadRectToDetectionFrame} from "./utils/quadRectToDetectionFrame";

export class Detection {
    private currentQuadTree: Quadtree;
    private previousQuadTree: Quadtree;

    constructor() {
        this.currentQuadTree = new Quadtree({
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.previousQuadTree = this.currentQuadTree;
    }

    aabbCollision(rect1: DetectionFrame, rect2: DetectionFrame) {
        return (
            rect1.x0 < rect2.x1 &&
            rect1.x1 > rect2.x0 &&
            rect1.y0 < rect2.y1 &&
            rect1.y1 > rect2.y0
        );
    }

    addFrame(detectionFrame: DetectionFrame) {
        this.currentQuadTree.insert(detectionFrameToQuadRect(detectionFrame));
    }

    detectCollisions(detectionFrame: DetectionFrame): DetectionFrame[] {
        const {x0, x1, y0, y1} = detectionFrame;

        const collidedElements = [];
        const candidates = this.previousQuadTree.retrieve({
            x: x0,
            y: y0,
            width: x1 - x0,
            height: y1 - y0,
        }) as DetectionQuadFrame[];

        for (let candidate of candidates) {
            if (candidate.id !== detectionFrame.id && this.aabbCollision(detectionFrame, quadRectToDetectionFrame(candidate))) {
                collidedElements.push(quadRectToDetectionFrame(candidate));
            }
        }

        return collidedElements;
    }

    swap(): void {
        this.previousQuadTree = this.currentQuadTree;
        this.currentQuadTree = new Quadtree({
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
}
