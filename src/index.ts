import {Root} from "./Root";
import {RectangleBoxGround} from "../game/RectangleBoxGround";
import {CharacterFatRectangle} from "../game/CharacterFatRectangle";

const GroundBox = new RectangleBoxGround({width: 800, height: 32, positionY: 640 - 32, positionX: 0});
const PlayableBox = new CharacterFatRectangle({width: 40, height: 40, positionX: 60, positionY: 60});

// probably we will have a main object Game with sub object called levels with instructions

const main = new Root("myCanvas", {x: 1, y: 1}, [GroundBox], [PlayableBox]);

main.start();



