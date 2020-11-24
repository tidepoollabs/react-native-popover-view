import { StyleProp, ViewStyle } from 'react-native';
import { Placement } from './Constants';
import { Rect, Size, Point } from './Utility';
declare type ComputeGeometryBaseProps = {
    requestedContentSize: Size;
    displayArea: Rect;
    debug: (line: string, obj?: any) => void;
};
declare type ComputeGeometryProps = ComputeGeometryBaseProps & {
    placement?: Placement;
    previousPlacement?: Placement;
    fromRect: Rect | null;
    arrowStyle: StyleProp<ViewStyle>;
    popoverStyle: StyleProp<ViewStyle>;
    arrowShift?: number;
};
export declare class Geometry {
    popoverOrigin: Point;
    anchorPoint: Point;
    placement: Placement;
    forcedContentSize: Size | null;
    viewLargerThanDisplayArea: {
        width: boolean;
        height: boolean;
    };
    constructor({ popoverOrigin, anchorPoint, placement, forcedContentSize, viewLargerThanDisplayArea }: {
        popoverOrigin: Point;
        anchorPoint: Point;
        placement: Placement;
        forcedContentSize: Size | null;
        viewLargerThanDisplayArea: {
            width: boolean;
            height: boolean;
        };
    });
    static equals(a: Geometry, b: Geometry): boolean;
}
export declare function computeGeometry(options: ComputeGeometryProps): Geometry;
export {};
