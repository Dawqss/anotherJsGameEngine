import {Renderer} from "./Renderer";
import {GameObject} from "./GameObject";
import {PlayableObject} from "./PlayableCharacter";

export class Root {
    renderer: Renderer;

    constructor(private scale: {x: number, y: number}, private gameObjects: GameObject[], private playableObjects: PlayableObject[]) {
        this.renderer = new Renderer(scale, gameObjects, playableObjects);
    }

    // wysylanie informacji do wszystkich blokow na raz
    // posiadac obiekt i ruszanie aka x,y, width, height, + velocity
    // Class Level (przejscie miedzy levelami?)

    start() {
        // this should be wrapped with more layers eg. game and levels.
        //but now this is prototype
        this.renderer.start();
    }
}
