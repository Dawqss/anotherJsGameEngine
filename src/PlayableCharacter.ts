import {GameObject} from "./GameObject";
import {GameObjectSizePosition, KeyboardArrows} from "./types";

export abstract class PlayableObject extends GameObject {
    lastMove: KeyboardArrows | undefined;

    constructor(public sizePosition: GameObjectSizePosition) {
        super(sizePosition);
        this.addControlHandlers();
    }

    addControlHandlers = () => {
        // TODO: add feat - shortcuts (Albert?)
        document.addEventListener("keydown", (event) => {
            console.log(event);
            this.lastMove = event.key as KeyboardArrows;
        });
    };

    abstract recalculate(): void;
}
