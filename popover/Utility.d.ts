import { StyleProp, ViewStyle } from 'react-native';
import { Placement } from './Constants';
export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static equals(a: Point, b: Point): boolean;
}
export declare class Size {
    width: number;
    height: number;
    constructor(width: number, height: number);
    static equals(a: Size, b: Size): boolean;
}
export declare class Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    static equals(a: Rect, b: Rect): boolean;
    static clone(rect: Rect): Rect;
}
export declare function getRectForRef(ref: any): Promise<Rect>;
export declare function waitForChange(getFirst: () => Promise<Rect>, getSecond: () => Promise<Rect>): Promise<void>;
export declare function waitForNewRect(ref: any, initialRect: Rect): Promise<Rect>;
export declare function sizeChanged(a: Size | null, b: Size | null): boolean;
export declare function rectChanged(a: Rect | null, b: Rect | null): boolean;
export declare function pointChanged(a: Point, b: Point): boolean;
export declare function getArrowSize(placement: Placement, arrowStyle: StyleProp<ViewStyle>): Size;
export declare function getBorderRadius(popoverStyle: StyleProp<ViewStyle>): number;
