export interface GameObjectSizePosition {
    width: number;
    height: number;
    positionX: number;
    positionY: number;
}

export interface Config {
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
