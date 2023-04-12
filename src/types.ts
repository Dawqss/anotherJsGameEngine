import {Rect} from "@timohausmann/quadtree-js";

export interface GameObjectSizePosition {
    width: number;
    height: number;
    positionX: number;
    positionY: number;
}

export interface RenderConfig {
    rect?: {
        width: number,
        height: number,
        positionX: number,
        positionY: number,
        style: {
            fill: string;
        }
    }
}

export enum KeyboardArrows {
    ArrowDown = "ArrowDown",
    ArrowLeft = "ArrowLeft",
    ArrowRight = "ArrowRight",
    ArrowUp = "ArrowUp",
}

export interface CollisionEvent {
    rootElementId: string;
    targetElements: {rootElementId: string;}[];
}

// same as detection frame but for quadtree lib
export interface DetectionQuadFrame extends Rect {
    id: string;
}

export interface DetectionFrame { x0: number; y0: number; x1: number; y1: number, id: string }
