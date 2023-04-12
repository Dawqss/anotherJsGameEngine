import {DetectionFrame} from "./types";

export class Grid {
    private cells: Map<string, DetectionFrame[]>;

    constructor(private cellSize: number) {
        this.cells = new Map();
    }

    private getCellKey(x: number, y: number): string {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        return `${cellX},${cellY}`;
    }

    insert(frame: DetectionFrame): void {
        const keys = [
            this.getCellKey(frame.x0, frame.y0),
            this.getCellKey(frame.x1, frame.y0),
            this.getCellKey(frame.x0, frame.y1),
            this.getCellKey(frame.x1, frame.y1)
        ];

        keys.forEach(key => {
            if (!this.cells.has(key)) {
                this.cells.set(key, []);
            }
            this.cells.get(key)!.push(frame);
        });
    }

    query(frame: DetectionFrame): DetectionFrame[] {
        const keys = [
            this.getCellKey(frame.x0, frame.y0),
            this.getCellKey(frame.x1, frame.y0),
            this.getCellKey(frame.x0, frame.y1),
            this.getCellKey(frame.x1, frame.y1)
        ];

        const potentialCollisions: DetectionFrame[] = [];
        keys.forEach(key => {
            if (this.cells.has(key)) {
                potentialCollisions.push(...this.cells.get(key)!);
            }
        });

        return potentialCollisions;
    }
}
