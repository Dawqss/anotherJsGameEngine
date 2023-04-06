import {GameObject} from "./GameObject";
import {GameObjectSizePosition} from "./types";

export abstract class PlayableObject extends GameObject {
    constructor(public initialSizePosition: GameObjectSizePosition) {
        super(initialSizePosition);
    }
}
