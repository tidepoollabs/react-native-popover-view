var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Placement } from './Constants';
import { Rect, Point, getArrowSize, getBorderRadius } from './Utility';
var Geometry = /** @class */ (function () {
    function Geometry(_a) {
        var popoverOrigin = _a.popoverOrigin, anchorPoint = _a.anchorPoint, placement = _a.placement, forcedContentSize = _a.forcedContentSize, viewLargerThanDisplayArea = _a.viewLargerThanDisplayArea;
        this.popoverOrigin = popoverOrigin;
        this.anchorPoint = anchorPoint;
        this.placement = placement;
        this.forcedContentSize = forcedContentSize;
        this.viewLargerThanDisplayArea = viewLargerThanDisplayArea;
    }
    Geometry.equals = function (a, b) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return Point.equals(a.popoverOrigin, b.popoverOrigin) &&
            Point.equals(a.anchorPoint, b.anchorPoint) &&
            a.placement === b.placement &&
            ((_a = a.forcedContentSize) === null || _a === void 0 ? void 0 : _a.width) === ((_b = b.forcedContentSize) === null || _b === void 0 ? void 0 : _b.width) &&
            ((_c = a.forcedContentSize) === null || _c === void 0 ? void 0 : _c.height) === ((_d = b.forcedContentSize) === null || _d === void 0 ? void 0 : _d.height) &&
            ((_e = a.viewLargerThanDisplayArea) === null || _e === void 0 ? void 0 : _e.width) === ((_f = b.viewLargerThanDisplayArea) === null || _f === void 0 ? void 0 : _f.width) &&
            ((_g = a.viewLargerThanDisplayArea) === null || _g === void 0 ? void 0 : _g.height) === ((_h = b.viewLargerThanDisplayArea) === null || _h === void 0 ? void 0 : _h.height);
    };
    return Geometry;
}());
export { Geometry };
export function computeGeometry(options) {
    var requestedContentSize = options.requestedContentSize, placement = options.placement, displayArea = options.displayArea, debug = options.debug, popoverStyle = options.popoverStyle, arrowShift = options.arrowShift;
    var newGeom = null;
    var fromRect = options.fromRect ? Rect.clone(options.fromRect) : null; // Make copy so doesn't modify original
    if (fromRect && options.fromRect instanceof Rect) {
        // Check to see if fromRect is outside of displayArea, and adjust if it is
        if (fromRect.x > displayArea.x + displayArea.width)
            fromRect.x = displayArea.x + displayArea.width;
        if (fromRect.y > displayArea.y + displayArea.height)
            fromRect.y = displayArea.y + displayArea.height;
        if (fromRect.x < 0)
            fromRect.x = -1 * fromRect.width;
        if (fromRect.y < 0)
            fromRect.y = -1 * fromRect.height;
        var borderRadius = getBorderRadius(popoverStyle);
        switch (placement) {
            case Placement.TOP:
                newGeom = computeTopGeometry(__assign(__assign({}, options), { fromRect: fromRect, borderRadius: borderRadius }));
                break;
            case Placement.BOTTOM:
                newGeom = computeBottomGeometry(__assign(__assign({}, options), { fromRect: fromRect, borderRadius: borderRadius }));
                break;
            case Placement.LEFT:
                newGeom = computeLeftGeometry(__assign(__assign({}, options), { fromRect: fromRect, borderRadius: borderRadius }));
                break;
            case Placement.RIGHT:
                newGeom = computeRightGeometry(__assign(__assign({}, options), { fromRect: fromRect, borderRadius: borderRadius }));
                break;
            case Placement.CENTER:
                newGeom = null;
                break;
            default:
                newGeom = computeAutoGeometry(__assign(__assign({}, options), { fromRect: fromRect, borderRadius: borderRadius }));
        }
        debug("computeGeometry - initial chosen geometry", newGeom);
        // If the popover will be restricted and the view that the popover is showing from is sufficiently large, try to show the popover inside the view
        if (newGeom && (newGeom.viewLargerThanDisplayArea.width || newGeom.viewLargerThanDisplayArea.height)) {
            var fromRectHeightVisible = fromRect.y < displayArea.y
                ? fromRect.height - (displayArea.y - fromRect.y)
                : displayArea.y + displayArea.height - fromRect.y;
            if (fromRect.width > requestedContentSize.width && fromRectHeightVisible > requestedContentSize.height) {
                var preferredX = Math.max(fromRect.x + 10, fromRect.x + (fromRect.width - requestedContentSize.width) / 2);
                var preferredY = Math.max(fromRect.y + 10, fromRect.y + (fromRect.height - requestedContentSize.height) / 2);
                var constrainedX = Math.max(preferredX, displayArea.x);
                if (constrainedX + requestedContentSize.width > displayArea.x + displayArea.width)
                    constrainedX = displayArea.x + displayArea.width - requestedContentSize.width;
                var constrainedY = Math.max(preferredY, displayArea.y);
                if (constrainedY + requestedContentSize.height > displayArea.y + displayArea.height)
                    constrainedY = displayArea.y + displayArea.height - requestedContentSize.height;
                var forcedContentSize = {
                    width: Math.min(fromRect.width - 20, displayArea.width),
                    height: Math.min(fromRect.height - 20, displayArea.height)
                };
                debug("computeGeometry - showing inside anchor");
                newGeom = new Geometry({
                    popoverOrigin: new Point(constrainedX, constrainedY),
                    anchorPoint: new Point(fromRect.x + (fromRect.width / 2), fromRect.y + (fromRect.height / 2)),
                    placement: Placement.CENTER,
                    forcedContentSize: forcedContentSize,
                    viewLargerThanDisplayArea: {
                        width: requestedContentSize.width > forcedContentSize.width,
                        height: requestedContentSize.height > forcedContentSize.height
                    }
                });
            }
            else if (
            // If we can't fit inside or outside the fromRect, show the popover centered on the screen,
            //  but only do this if they haven't asked for a specifc placement type
            //  and if it will actually help show more content
            placement === Placement.AUTO &&
                ((newGeom.viewLargerThanDisplayArea.width && [Placement.RIGHT, Placement.LEFT].includes(newGeom.placement)) ||
                    (newGeom.viewLargerThanDisplayArea.height && [Placement.TOP, Placement.BOTTOM].includes(newGeom.placement)))) {
                newGeom = null;
            }
        }
    }
    if (!newGeom) {
        var minY = displayArea.y;
        var minX = displayArea.x;
        var preferedY = (displayArea.height - requestedContentSize.height) / 2 + displayArea.y;
        var preferedX = (displayArea.width - requestedContentSize.width) / 2 + displayArea.x;
        debug("computeGeometry - showing centered on screen");
        newGeom = new Geometry({
            popoverOrigin: new Point(Math.max(minX, preferedX), Math.max(minY, preferedY)),
            anchorPoint: new Point(displayArea.width / 2 + displayArea.x, displayArea.height / 2 + displayArea.y),
            placement: Placement.CENTER,
            forcedContentSize: {
                width: displayArea.width,
                height: displayArea.height
            },
            viewLargerThanDisplayArea: {
                width: preferedX < minX - 1,
                height: preferedY < minY - 1
            }
        });
    }
    if (arrowShift && fromRect) {
        if (newGeom.placement === Placement.BOTTOM || newGeom.placement === Placement.TOP)
            newGeom.anchorPoint.x += arrowShift * 0.5 * fromRect.width;
        else
            newGeom.anchorPoint.y += arrowShift * 0.5 * fromRect.height;
    }
    debug("computeGeometry - final chosen geometry", newGeom);
    return newGeom;
}
function computeTopGeometry(_a) {
    var displayArea = _a.displayArea, fromRect = _a.fromRect, requestedContentSize = _a.requestedContentSize, arrowStyle = _a.arrowStyle, borderRadius = _a.borderRadius;
    var arrowSize = getArrowSize(Placement.TOP, arrowStyle);
    var minY = displayArea.y;
    var preferredY = fromRect.y - requestedContentSize.height - arrowSize.height;
    var forcedContentSize = {
        height: (fromRect.y - arrowSize.height - displayArea.y),
        width: displayArea.width
    };
    var viewLargerThanDisplayArea = {
        height: preferredY < minY - 1,
        width: requestedContentSize.width > displayArea.width + 1
    };
    var viewWidth = viewLargerThanDisplayArea.width ? forcedContentSize.width : requestedContentSize.width;
    var maxX = displayArea.x + displayArea.width - viewWidth;
    var minX = displayArea.x;
    var preferredX = fromRect.x + (fromRect.width - viewWidth) / 2;
    var popoverOrigin = new Point(Math.min(maxX, Math.max(minX, preferredX)), Math.max(minY, preferredY));
    var anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y);
    // Make sure the arrow isn't cut off
    anchorPoint.x = Math.max(anchorPoint.x, arrowSize.width / 2 + borderRadius);
    anchorPoint.x = Math.min(anchorPoint.x, displayArea.x + displayArea.width - (arrowSize.width / 2) - borderRadius);
    return new Geometry({
        popoverOrigin: popoverOrigin,
        anchorPoint: anchorPoint,
        placement: Placement.TOP,
        forcedContentSize: forcedContentSize,
        viewLargerThanDisplayArea: viewLargerThanDisplayArea
    });
}
function computeBottomGeometry(_a) {
    var displayArea = _a.displayArea, fromRect = _a.fromRect, requestedContentSize = _a.requestedContentSize, arrowStyle = _a.arrowStyle, borderRadius = _a.borderRadius;
    var arrowSize = getArrowSize(Placement.BOTTOM, arrowStyle);
    var preferedY = fromRect.y + fromRect.height + arrowSize.height;
    var forcedContentSize = {
        height: displayArea.y + displayArea.height - preferedY,
        width: displayArea.width
    };
    var viewLargerThanDisplayArea = {
        height: preferedY + requestedContentSize.height > displayArea.y + displayArea.height + 1,
        width: requestedContentSize.width > displayArea.width + 1
    };
    var viewWidth = viewLargerThanDisplayArea.width ? forcedContentSize.width : requestedContentSize.width;
    var maxX = displayArea.x + displayArea.width - viewWidth;
    var minX = displayArea.x;
    var preferedX = fromRect.x + (fromRect.width - viewWidth) / 2;
    var popoverOrigin = new Point(Math.min(maxX, Math.max(minX, preferedX)), preferedY);
    var anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y + fromRect.height);
    // Make sure the arrow isn't cut off
    anchorPoint.x = Math.max(anchorPoint.x, arrowSize.width / 2 + borderRadius);
    anchorPoint.x = Math.min(anchorPoint.x, displayArea.x + displayArea.width - (arrowSize.width / 2) - borderRadius);
    return new Geometry({
        popoverOrigin: popoverOrigin,
        anchorPoint: anchorPoint,
        placement: Placement.BOTTOM,
        forcedContentSize: forcedContentSize,
        viewLargerThanDisplayArea: viewLargerThanDisplayArea
    });
}
function computeLeftGeometry(_a) {
    var displayArea = _a.displayArea, fromRect = _a.fromRect, requestedContentSize = _a.requestedContentSize, borderRadius = _a.borderRadius, arrowStyle = _a.arrowStyle;
    var arrowSize = getArrowSize(Placement.LEFT, arrowStyle);
    var forcedContentSize = {
        height: displayArea.height,
        width: fromRect.x - displayArea.x - arrowSize.width
    };
    var viewLargerThanDisplayArea = {
        height: requestedContentSize.height > displayArea.height + 1,
        width: requestedContentSize.width > fromRect.x - displayArea.x - arrowSize.width + 1
    };
    var viewWidth = viewLargerThanDisplayArea.width ? forcedContentSize.width : requestedContentSize.width;
    var viewHeight = viewLargerThanDisplayArea.height ? forcedContentSize.height : requestedContentSize.height;
    var preferedX = fromRect.x - viewWidth - arrowSize.width;
    var preferedY = fromRect.y + (fromRect.height - viewHeight) / 2;
    var minY = displayArea.y;
    var maxY = (displayArea.height - viewHeight) + displayArea.y;
    var popoverOrigin = new Point(preferedX, Math.min(Math.max(minY, preferedY), maxY));
    var anchorPoint = new Point(fromRect.x, fromRect.y + fromRect.height / 2.0);
    // Make sure the arrow isn't cut off
    anchorPoint.y = Math.max(anchorPoint.y, arrowSize.height / 2 + borderRadius);
    anchorPoint.y = Math.min(anchorPoint.y, displayArea.y + displayArea.height - (arrowSize.height / 2) - borderRadius);
    return new Geometry({
        popoverOrigin: popoverOrigin,
        anchorPoint: anchorPoint,
        placement: Placement.LEFT,
        forcedContentSize: forcedContentSize,
        viewLargerThanDisplayArea: viewLargerThanDisplayArea
    });
}
function computeRightGeometry(_a) {
    var displayArea = _a.displayArea, fromRect = _a.fromRect, requestedContentSize = _a.requestedContentSize, arrowStyle = _a.arrowStyle, borderRadius = _a.borderRadius;
    var arrowSize = getArrowSize(Placement.RIGHT, arrowStyle);
    var horizontalSpace = displayArea.x + displayArea.width - (fromRect.x + fromRect.width) - arrowSize.width;
    var forcedContentSize = {
        height: displayArea.height,
        width: horizontalSpace
    };
    var viewLargerThanDisplayArea = {
        height: requestedContentSize.height > displayArea.height + 1,
        width: requestedContentSize.width > horizontalSpace + 1
    };
    var viewHeight = viewLargerThanDisplayArea.height ? forcedContentSize.height : requestedContentSize.height;
    var preferedX = fromRect.x + fromRect.width + arrowSize.width;
    var preferedY = fromRect.y + (fromRect.height - viewHeight) / 2;
    var minY = displayArea.y;
    var maxY = (displayArea.height - viewHeight) + displayArea.y;
    var popoverOrigin = new Point(preferedX, Math.min(Math.max(minY, preferedY), maxY));
    var anchorPoint = new Point(fromRect.x + fromRect.width, fromRect.y + fromRect.height / 2.0);
    // Make sure the arrow isn't cut off
    anchorPoint.y = Math.max(anchorPoint.y, arrowSize.height / 2 + borderRadius);
    anchorPoint.y = Math.min(anchorPoint.y, displayArea.y + displayArea.height - (arrowSize.height / 2) - borderRadius);
    return new Geometry({
        popoverOrigin: popoverOrigin,
        anchorPoint: anchorPoint,
        placement: Placement.RIGHT,
        forcedContentSize: forcedContentSize,
        viewLargerThanDisplayArea: viewLargerThanDisplayArea
    });
}
function computeAutoGeometry(options) {
    var displayArea = options.displayArea, requestedContentSize = options.requestedContentSize, fromRect = options.fromRect, previousPlacement = options.previousPlacement, debug = options.debug, arrowStyle = options.arrowStyle;
    // Keep same placement if possible (left/right)
    if (previousPlacement === Placement.LEFT || previousPlacement === Placement.RIGHT) {
        var geom = previousPlacement === Placement.LEFT
            ? computeLeftGeometry(options)
            : computeRightGeometry(options);
        debug("computeAutoGeometry - Left/right tryping to keep same, geometry", geom);
        if (!geom.viewLargerThanDisplayArea.width)
            return geom;
    }
    // Keep same placement if possible (top/bottom)
    if (previousPlacement === Placement.TOP || previousPlacement === Placement.BOTTOM) {
        var geom = previousPlacement === Placement.TOP
            ? computeTopGeometry(options)
            : computeBottomGeometry(options);
        debug("computeAutoGeometry - Top/bottom tryping to keep same, geometry", geom);
        if (!geom.viewLargerThanDisplayArea.height)
            return geom;
    }
    // Otherwise, find the place that can fit it best (try left/right but default to top/bottom as that will typically have more space
    var arrowSize = getArrowSize(Placement.LEFT, arrowStyle);
    // If it fits on left, choose left
    if (fromRect.x - displayArea.x - arrowSize.width >= requestedContentSize.width) { // We could fit it on the left side
        debug("computeAutoGeometry - could fit on left side");
        return computeLeftGeometry(options);
    }
    // If it fits on right, choose right
    if (displayArea.x + displayArea.width - (fromRect.x + fromRect.width) - arrowSize.width >= requestedContentSize.width) { // We could fit it on the right side
        debug("computeAutoGeometry - could fit on right side");
        return computeRightGeometry(options);
    }
    // We could fit it on the top or bottom, need to figure out which is better
    var topSpace = fromRect.y - displayArea.y;
    var bottomSpace = displayArea.y + displayArea.height - (fromRect.y + fromRect.height);
    debug("computeAutoGeometry - Top/bottom picking best, top space", topSpace);
    return (topSpace - 50) > bottomSpace ? computeTopGeometry(options) : computeBottomGeometry(options);
}
//# sourceMappingURL=Geometry.js.map