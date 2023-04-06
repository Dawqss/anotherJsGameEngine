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
