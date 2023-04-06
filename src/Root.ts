import {Renderer} from "./Renderer";
import {RectangleBoxGround} from "../game/RectangleBoxGround";
import {GameObject} from "./GameObject";

export class Root {
    renderer: Renderer;

    constructor(private canvasId: string, private scale: {x: number, y: number}, private gameObjects: GameObject[]) {
        this.renderer = new Renderer(canvasId, scale, gameObjects);
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
