import {GameObjectSizePosition} from "./types";

export abstract class GameObject {
    constructor(public initialSizePosition: GameObjectSizePosition) {}


    constructor(width: number, height: number, positionX: number, positionY: number, immutable: boolean) {
        this.width = width;
        this.height = height;
        this.positionX = positionX;
        this.positionY = positionY;
        this.immutable = immutable;
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

    abstract getRenderConfig(): any;
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
