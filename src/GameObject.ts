import { v4 } from 'uuid';
import {DetectionFrame, GameObjectSizePosition, RenderConfig} from "./types";
import {Vector2} from "./common";

export abstract class GameObject {
    private _lastPosition: { x: number, y: number } | undefined;
    public currentVector: Vector2;
    public config: RenderConfig | undefined;
    public isCollisionDetectionEnabled = true;
    public isDragEnabled = true;
    public dragMultiplier = 1.05;
    public isBounceEnabled = true;
    public bounceMultiplier = 2.5;

    public name: string;

    constructor(public sizePosition: GameObjectSizePosition) {
        this.name = v4();
        this.currentVector = new Vector2(0, 0);
    }

    update(){
        this._updateBounce();
        this._updateDrag();
        this._updateLastPosition();
    }

    getFrameDetection(): DetectionFrame {
        if (!this.isCollisionDetectionEnabled) return {x0: 0, y0: 0, x1: 0, y1: 0, id: this.name};
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
        if (this._lastPosition) {
            const x = this._lastPosition.x - this.sizePosition.positionX;
            const y = this._lastPosition.y - this.sizePosition.positionY;
            result =  Math.sqrt(x * x + y * y);
        }
        return result;
    }

    vectorAdd(vector: Vector2) {
        this.currentVector = this.currentVector.add(vector);
    }

    bounce(){
        this.currentVector = this.currentVector.multiply(-1 * this.bounceMultiplier);
    }

    private _updateBounce() {
        if (!this.isBounceEnabled) return;
        //this.currentVector = this.currentVector.multiply(-1 * this.bounceMultiplier);
    }

    private _updateDrag() {
        if (!this.isDragEnabled) return;
        if (this.dragMultiplier > 1){
            this.currentVector = this.currentVector.multiply(1/this.dragMultiplier);
        }
    }

    private _updateLastPosition() {
        this._lastPosition = {
            x: this.sizePosition.positionX,
            y: this.sizePosition.positionY
        }
    }


    // how to render it?
    // should probably return some config on end and then merge it with other configs
    // I should have here stable object or unstable objects information to check if I can somehow interact with object

    // dependecy loop idea:
    // 1. create information data about stable or unstable object and pass it to gameObjects that can move
    // (with Handlers or maybe just class Character withc will be loaded on other endpoint)
    // 2. create calculation on character and create some data information from it
    // 3. pass it to unstable object so we can interact with them (eg fire torch, little grass movement etc)
    // 4. render all things from gameObjects or/and character object

    abstract getRenderConfig(): RenderConfig;

}



// EXAMPLE
// abstract class Department {
//     constructor(public name: string) {}
//
//     printName(): void {
//         console.log("Department name: " + this.name);
//     }
//
//     abstract printMeeting(): void; // must be implemented in derived classes
// }
//
// class AccountingDepartment extends Department {
//     constructor() {
//         super("Accounting and Auditing"); // constructors in derived classes must call super()
//     }
//
//     printMeeting(): void {
//         console.log("The Accounting Department meets each Monday at 10am.");
//     }
//
//     generateReports(): void {
//         console.log("Generating accounting reports...");
//     }
// }
//
