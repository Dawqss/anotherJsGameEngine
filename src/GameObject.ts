import { v4 } from 'uuid';
import {DetectionFrame, GameObjectSizePosition, RenderConfig} from "./types";
import {Vector2} from "./common";
import {Detection} from "./Detection";

export abstract class GameObject {
    private lastPosition: { x: number, y: number } | undefined;
    public currentVector: Vector2;
    public isCollisionDetectionEnabled = true;
    public isDragEnabled = true;
    public dragMultiplier = 1.05;
    public isBounceEnabled = false;
    public bounceMultiplier = 2.5;
    public name: string;

    constructor(public sizePosition: GameObjectSizePosition, public detection: Detection, public config: RenderConfig) {
        this.name = v4();
        this.currentVector = new Vector2(0, 0);
    }

    update(){
        this.updateBounce();
        this.updateDrag();
        this.updateLastPosition();
    }

    getFrameDetection(): DetectionFrame | undefined {
        if (!this.isCollisionDetectionEnabled) {
            return undefined;
        }

        return {
            x0: this.sizePosition.positionX,
            y0: this.sizePosition.positionY,
            x1: this.sizePosition.positionX + this.sizePosition.width,
            y1: this.sizePosition.positionY + this.sizePosition.height,
            id: this.name
        };
    }

    getFrameVelocity(): number {
        let result = 0
        if (this.lastPosition) {
            const x = this.lastPosition.x - this.sizePosition.positionX;
            const y = this.lastPosition.y - this.sizePosition.positionY;
            result =  Math.sqrt(x * x + y * y);
        }
        return result;
    }

    addVector(vector: Vector2) {
        this.currentVector = this.currentVector.add(vector);
    }

    // @SideEffect
    bounce() {
        this.currentVector = this.currentVector.multiply(-1 * this.bounceMultiplier);
    }

    // @SideEffect
    private updateBounce() {
        if (!this.isBounceEnabled) return;
        //this.currentVector = this.currentVector.multiply(-1 * this.bounceMultiplier);
    }

    // @SideEffect
    private updateDrag() {
        if (!this.isDragEnabled) return;
        if (this.dragMultiplier > 1){
            this.currentVector = this.currentVector.multiply(1/this.dragMultiplier);
        }
    }

    private updateLastPosition() {
        this.lastPosition = {
            x: this.sizePosition.positionX,
            y: this.sizePosition.positionY
        }
    }

    abstract getRenderConfig(): RenderConfig;

    abstract recalculate(): void;

}
