import {DetectionFrame, DetectionQuadFrame} from "../types";


export const quadRectToDetectionFrame = ({x, y, width, height, id}: DetectionQuadFrame): DetectionFrame  => ({
    x0: x,
    y0: y,
    x1: x + width,
    y1: y + height,
    id
});
