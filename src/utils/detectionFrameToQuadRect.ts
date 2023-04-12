import {DetectionFrame, DetectionQuadFrame} from "../types";

export const detectionFrameToQuadRect = ({x0, x1, y0, y1, id}: DetectionFrame): DetectionQuadFrame => ({
    x: x0,
    y: y0,
    width: x1 - x0,
    height: y1 - y0,
    id
});
