import {Root} from "./Root";
import {RectangleBoxGround} from "../game/RectangleBoxGround";

const GroundBox = new RectangleBoxGround({width: 32, height: 32, positionY: 5, positionX: 10});

const main = new Root("myCanvas", {x: 2, y: 2}, [GroundBox]);

main.start();



