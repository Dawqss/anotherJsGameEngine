import {GameObject} from "./GameObject";
import {GameObjectSizePosition, KeyboardArrows} from "./types";

export const emptyPlayableKeyMap: Record<KeyboardArrows, boolean> = {
    [KeyboardArrows.ArrowUp]: false,
    [KeyboardArrows.ArrowDown]: false,
    [KeyboardArrows.ArrowLeft]: false,
    [KeyboardArrows.ArrowRight]: false
};

export abstract class PlayableObject extends GameObject {
    public keyMap: Record<KeyboardArrows, boolean> = emptyPlayableKeyMap;
    public moveDeltaInMs: number = 600;

    constructor(public sizePosition: GameObjectSizePosition) {
        super(sizePosition);
        this.addControlHandlers();
    }

    addControlHandlers = () => {
        window.addEventListener('keydown', (e) => {
            if (!this.keyMap[e.code as KeyboardArrows]) {
                this.keyMap[e.code as KeyboardArrows] = true;
            }
        })

        window.addEventListener('keyup', (e) => {
            if (this.keyMap[e.code as KeyboardArrows]) {
                this.keyMap[e.code as KeyboardArrows] = false;
            }
        })
    };

    abstract recalculate(): void;
}
