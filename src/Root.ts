import {Renderer} from "./Renderer";

export class Root {
    renderer: Renderer;

    constructor(private canvasId: string, private scale: {x: number, y: number}) {
        this.renderer = new Renderer(canvasId, scale);
    }

    // loadGameObjects() {
    //
    // }

    // wysylanie informacji do wszystkich blokow na raz

    // posiadac obiekt i ruszanie aka x,y, width, height, + velocity

    // Class Level (przejscie miedzy levelami?)

    start() {
        this.renderer.start();
    }
}
