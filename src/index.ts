import {Root} from "./Root";
import {RectangleBoxGround} from "../game/RectangleBoxGround";

const GroundBox = new RectangleBoxGround({width: 800, height: 32, positionY: 640 - 32, positionX: 0});

const main = new Root("myCanvas", {x: 1, y: 1}, [GroundBox]);

main.start();



