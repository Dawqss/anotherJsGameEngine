import {Root} from "./Root";
import {RectangleBoxGround} from "../game/RectangleBoxGround";
import {CharacterFatRectangle} from "../game/CharacterFatRectangle";
import {Detection} from "./Detection";

const detection = new Detection();
const GroundBox = new RectangleBoxGround({width: window.innerWidth, height: 32, positionY: window.innerHeight - 32, positionX: 0}, detection, {
    rect: {
        width: window.innerWidth,
        height: 32,
        positionX: 0,
        positionY: window.innerHeight - 32,
        style: {
            fill: "#E1C16E"
        }
    }
});
const PlayableBox = new CharacterFatRectangle({width: 40, height: 40, positionX: 60, positionY: 60}, detection, {
    rect: {
        width: 40,
        height: 40,
        positionX: 60,
        positionY: 60,
        style: {
            fill: "#1e4800"
        }
    }
});

const main = new Root({x: 1, y: 1}, [GroundBox], [PlayableBox], detection);

main.start();

