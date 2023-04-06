import {Renderer} from "./Renderer";

export class Root {
    renderer: Renderer;

    constructor(private canvasId: string, private scale: {x: number, y: number}) {
        this.renderer = new Renderer(0, canvasId, scale);
    }

    // loadGameObjects() {
    //
    // }

    // wysylanie informacji do wszystkich blokow na raz

    // posiadac obiekt i ruszanie aka x,y, width, height, + velocity

    // Class Level (przejscie miedzy levelami?)

    start() {
        // this should be wrapped with more layers eg. game and levels.
        //but now this is prototype
        this.renderer.start();
    }
}
