'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { Platform, Dimensions, Animated, TouchableWithoutFeedback, View, Modal, Easing, StyleSheet, I18nManager } from 'react-native';
import { Rect, Point, getRectForRef, getArrowSize, getBorderRadius } from './Utility';
import { MULTIPLE_POPOVER_WARNING, Placement, Mode, DEFAULT_BORDER_RADIUS, FIX_SHIFT as ORIGINAL_FIX_SHIFT } from './Constants';
import { computeGeometry, Geometry } from './Geometry';
var noop = function () { };
var isIOS = Platform.OS === 'ios';
var isWeb = Platform.OS === 'web';
var DEBUG = false;
var FIX_SHIFT = isWeb ? 0 : ORIGINAL_FIX_SHIFT;
// React Native Web does not export ViewPropTypes, so this is a workaround
var stylePropType = isWeb
    ? PropTypes.object
    : require('react-native').ViewPropTypes.style;
var Popover = /** @class */ (function (_super) {
    __extends(Popover, _super);
    function Popover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isVisible: false
        };
        _this.sourceRef = React.createRef();
        return _this;
    }
    Popover.prototype.render = function () {
        var _this = this;
        var _a = this.props, mode = _a.mode, from = _a.from, isVisible = _a.isVisible, onRequestClose = _a.onRequestClose, extraView = _a.extraView, otherProps = __rest(_a, ["mode", "from", "isVisible", "onRequestClose", "extraView"]);
        var actualIsVisible = isVisible === undefined ? this.state.isVisible : isVisible;
        var fromRect = undefined;
        var fromRef = undefined;
        var sourceElement = undefined;
        if (from) {
            if (from instanceof Rect) {
                fromRect = from;
            }
            else if (from.hasOwnProperty('current')) {
                fromRef = from;
            }
            else if (typeof from === 'function') {
                var element = from(this.sourceRef, function () { return _this.setState({ isVisible: true }); });
                if (React.isValidElement(element)) {
                    sourceElement = element;
                    fromRef = this.sourceRef;
                }
            }
            else if (React.isValidElement(from)) {
                if (isVisible === undefined)
                    sourceElement = React.cloneElement(from, { onPress: function () { return _this.setState({ isVisible: true }); } });
                else
                    sourceElement = from;
                fromRef = this.sourceRef;
            }
            else {
                console.warn('Popover: `from` prop is an invalid value. Pass a React element, Rect, RefObject, or function that returns a React element.');
            }
        }
        if (sourceElement) {
            sourceElement = React.cloneElement(sourceElement, { ref: this.sourceRef });
        }
        var modalProps = __assign(__assign({}, otherProps), { fromRect: fromRect,
            fromRef: fromRef,
            extraView: extraView, isVisible: actualIsVisible, onRequestClose: function () {
                onRequestClose && onRequestClose();
                _this.setState({ isVisible: false });
            } });
        if (mode === Mode.RN_MODAL) {
            return (React.createElement(React.Fragment, null,
                sourceElement,
                React.createElement(RNModalPopover, __assign({}, modalProps))));
        }
        else {
            return (React.createElement(React.Fragment, null,
                sourceElement,
                React.createElement(JSModalPopover, __assign({ showBackground: mode !== Mode.TOOLTIP }, modalProps))));
        }
    };
    Popover.propTypes = {
        // display
        isVisible: PropTypes.bool,
        // anchor
        from: PropTypes.oneOfType([PropTypes.instanceOf(Rect), PropTypes.func, PropTypes.node, PropTypes.shape({ current: PropTypes.any })]),
        // config
        displayArea: PropTypes.oneOfType([PropTypes.instanceOf(Rect), PropTypes.exact({ x: PropTypes.number, y: PropTypes.number, width: PropTypes.number, height: PropTypes.number })]),
        placement: PropTypes.oneOf([Placement.LEFT, Placement.RIGHT, Placement.TOP, Placement.BOTTOM, Placement.AUTO, Placement.CENTER]),
        animationConfig: PropTypes.object,
        verticalOffset: PropTypes.number,
        safeAreaInsets: PropTypes.object,
        // style
        popoverStyle: stylePropType,
        arrowStyle: stylePropType,
        backgroundStyle: stylePropType,
        arrowShift: PropTypes.number,
        // lifecycle
        onOpenStart: PropTypes.func,
        onOpenComplete: PropTypes.func,
        onRequestClose: PropTypes.func,
        onCloseStart: PropTypes.func,
        onCloseComplete: PropTypes.func,
        extraView: PropTypes.node,
        debug: PropTypes.bool,
    };
    Popover.defaultProps = {
        mode: Mode.RN_MODAL,
        onOpenStart: noop,
        onOpenComplete: noop,
        onRequestClose: noop,
        onCloseStart: noop,
        onCloseComplete: noop,
        verticalOffset: 0,
        debug: false
    };
    return Popover;
}(Component));
export default Popover;
var RNModalPopover = /** @class */ (function (_super) {
    __extends(RNModalPopover, _super);
    function RNModalPopover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: false
        };
        return _this;
    }
    RNModalPopover.prototype.componentDidMount = function () {
        if (this.props.isVisible) {
            if (!RNModalPopover.isShowingInModal)
                this.setState({ visible: true });
            else
                console.warn(MULTIPLE_POPOVER_WARNING);
        }
    };
    RNModalPopover.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.isVisible && !prevProps.isVisible) {
            if (!RNModalPopover.isShowingInModal)
                this.setState({ visible: true });
            else
                console.warn(MULTIPLE_POPOVER_WARNING);
        }
    };
    RNModalPopover.prototype.render = function () {
        var _this = this;
        var _a = this.props, statusBarTranslucent = _a.statusBarTranslucent, extraView = _a.extraView, onOpenStart = _a.onOpenStart, onCloseStart = _a.onCloseStart, onCloseComplete = _a.onCloseComplete, onRequestClose = _a.onRequestClose, otherProps = __rest(_a, ["statusBarTranslucent", "extraView", "onOpenStart", "onCloseStart", "onCloseComplete", "onRequestClose"]);
        var visible = this.state.visible;
        return (React.createElement(Modal, { transparent: true, supportedOrientations: ['portrait', 'portrait-upside-down', 'landscape'], hardwareAccelerated: true, visible: visible, statusBarTranslucent: statusBarTranslucent, onShow: function () {
                onOpenStart && onOpenStart();
                RNModalPopover.isShowingInModal = true;
            }, onDismiss: function () {
                onCloseComplete && onCloseComplete();
            }, onRequestClose: onRequestClose },
            React.createElement(AdaptivePopover, __assign({ onRequestClose: onRequestClose, onCloseComplete: function () {
                    _this.setState({ visible: false });
                    if (!isIOS) {
                        onCloseComplete && onCloseComplete();
                    }
                }, onCloseStart: function () {
                    onCloseStart && onCloseStart();
                    RNModalPopover.isShowingInModal = false;
                }, onOpenStart: onOpenStart, extraView: extraView, getDisplayAreaOffset: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, new Point(0, 0)];
                }); }); } }, otherProps))));
    };
    RNModalPopover.isShowingInModal = false;
    return RNModalPopover;
}(Component));
var JSModalPopover = /** @class */ (function (_super) {
    __extends(JSModalPopover, _super);
    function JSModalPopover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: false
        };
        _this.containerRef = React.createRef();
        return _this;
    }
    JSModalPopover.prototype.componentDidMount = function () {
        if (this.props.isVisible)
            this.setState({ visible: true });
    };
    JSModalPopover.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.isVisible && !prevProps.isVisible)
            this.setState({ visible: true });
    };
    JSModalPopover.prototype.render = function () {
        var _this = this;
        var _a = this.props, onCloseComplete = _a.onCloseComplete, otherProps = __rest(_a, ["onCloseComplete"]);
        var visible = this.state.visible;
        if (visible) {
            return (React.createElement(View, { pointerEvents: "box-none", style: [styles.container, { left: 0 }], ref: this.containerRef },
                React.createElement(AdaptivePopover, __assign({ onCloseComplete: function () {
                        onCloseComplete && onCloseComplete();
                        _this.setState({ visible: false });
                    }, getDisplayAreaOffset: function () { return __awaiter(_this, void 0, void 0, function () {
                        var rect;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getRectForRef(this.containerRef)];
                                case 1:
                                    rect = _a.sent();
                                    return [2 /*return*/, new Point(rect.x, rect.y)];
                            }
                        });
                    }); } }, otherProps))));
        }
        return null;
    };
    return JSModalPopover;
}(Component));
var AdaptivePopover = /** @class */ (function (_super) {
    __extends(AdaptivePopover, _super);
    function AdaptivePopover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            fromRect: null,
            shiftedDisplayArea: null,
            defaultDisplayArea: null,
            displayAreaOffset: null,
        };
        // This is used so that when the device is rotating or the viewport is expanding for any other reason,
        //  we can suspend updates due to content changes until we are finished calculating the new display
        //  area and rect for the new viewport size
        // This makes the recalc on rotation much faster
        _this.waitForResizeToFinish = false;
        _this.skipNextDefaultDisplayArea = false;
        _this._isMounted = false;
        // First thing called when device rotates
        _this.handleResizeEvent = function (change) {
            _this.debug("handleResizeEvent - New Dimensions", change);
            if (_this.props.isVisible) {
                _this.waitForResizeToFinish = true;
            }
        };
        return _this;
    }
    AdaptivePopover.prototype.getDisplayArea = function () {
        return this.state.shiftedDisplayArea || this.props.displayArea || this.state.defaultDisplayArea || new Rect(10, 10, Dimensions.get('window').width - 20, Dimensions.get('window').height - 20);
    };
    AdaptivePopover.prototype.componentDidMount = function () {
        Dimensions.addEventListener('change', this.handleResizeEvent);
        if (this.props.fromRect)
            this.setState({ fromRect: this.props.fromRect });
        else if (this.props.fromRef) {
            this.calculateRectFromRef();
        }
        this._isMounted = true;
    };
    AdaptivePopover.prototype.componentWillUnmount = function () {
        this._isMounted = false;
        Dimensions.removeEventListener('change', this.handleResizeEvent);
    };
    AdaptivePopover.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        // Make sure a value we care about has actually changed
        var importantProps = ["from", "displayArea"];
        if (!importantProps.reduce(function (acc, key) { return acc || _this.props[key] !== prevProps[key]; }, false))
            return;
        if (this.props.fromRect && prevProps.fromRect && !Rect.equals(this.props.fromRect, prevProps.fromRect))
            this.setState({ fromRect: this.props.fromRect });
        else if (this.props.fromRef) {
            this.calculateRectFromRef();
        }
        if (this.props.isVisible && prevProps.isVisible) {
            var displayArea = this.props.displayArea;
            if ((this.props.displayArea && !prevProps.displayArea)
                || (displayArea && prevProps.displayArea && !Rect.equals(displayArea, prevProps.displayArea))
                || (this.displayAreaStore && !Rect.equals(this.getDisplayArea(), this.displayAreaStore))) {
                this.displayAreaStore = this.getDisplayArea();
            }
        }
    };
    AdaptivePopover.prototype.debug = function (line, obj) {
        if (DEBUG || this.props.debug)
            console.log("[" + (new Date()).toISOString() + "] " + line + (obj ? ": " + JSON.stringify(obj) : ''));
    };
    AdaptivePopover.prototype.setDefaultDisplayArea = function (newDisplayArea) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultDisplayArea, isValidDisplayArea, displayAreaOffset_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isMounted)
                            return [2 /*return*/];
                        defaultDisplayArea = this.state.defaultDisplayArea;
                        isValidDisplayArea = newDisplayArea.width > 0 && newDisplayArea.height > 0;
                        if (!((!defaultDisplayArea || !Rect.equals(defaultDisplayArea, newDisplayArea)) && isValidDisplayArea)) return [3 /*break*/, 6];
                        this.debug("setDefaultDisplayArea - newDisplayArea", newDisplayArea);
                        if (!!this.skipNextDefaultDisplayArea) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.props.getDisplayAreaOffset()];
                    case 1:
                        displayAreaOffset_1 = _a.sent();
                        this.debug("setDefaultDisplayArea - displayAreaOffset", displayAreaOffset_1);
                        return [4 /*yield*/, new Promise(function (resolve) { return _this.setState({ defaultDisplayArea: newDisplayArea, displayAreaOffset: displayAreaOffset_1 }, resolve); })];
                    case 2:
                        _a.sent();
                        if (!this.props.fromRef) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.calculateRectFromRef()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.waitForResizeToFinish = false;
                        this.displayAreaStore = this.getDisplayArea();
                        _a.label = 5;
                    case 5:
                        if (this.skipNextDefaultDisplayArea)
                            this.debug("setDefaultDisplayArea - Skipping first because isLandscape");
                        this.skipNextDefaultDisplayArea = false;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdaptivePopover.prototype.keyboardDidShow = function (e) {
        this.debug("keyboardDidShow - keyboard height: " + e.endCoordinates.height);
    };
    AdaptivePopover.prototype.keyboardDidHide = function () {
        this.debug("keyboardDidHide");
        if (this._isMounted)
            this.setState({ shiftedDisplayArea: null });
    };
    AdaptivePopover.prototype.shiftForKeyboard = function (keyboardHeight) {
        var displayArea = this.getDisplayArea();
        var absoluteVerticalCutoff = Dimensions.get('window').height - keyboardHeight - (isIOS ? 10 : 40);
        var combinedY = Math.min(displayArea.height + displayArea.y, absoluteVerticalCutoff);
        this.setState({
            shiftedDisplayArea: {
                x: displayArea.x,
                y: displayArea.y,
                width: displayArea.width,
                height: combinedY - displayArea.y
            }
        });
    };
    AdaptivePopover.prototype.calculateRectFromRef = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fromRef, initialRect, displayAreaOffset, count, verticalOffset, horizontalOffset, rect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromRef = this.props.fromRef;
                        initialRect = this.state.fromRect || new Rect(0, 0, 0, 0);
                        displayAreaOffset = this.state.displayAreaOffset || { x: 0, y: 0 };
                        this.debug('calculateRectFromRef - waiting for ref');
                        count = 0;
                        _a.label = 1;
                    case 1:
                        if (!!(fromRef === null || fromRef === void 0 ? void 0 : fromRef.current)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _a.sent();
                        if (count++ > 20)
                            return [2 /*return*/]; // Timeout after 2 seconds
                        return [3 /*break*/, 1];
                    case 3:
                        verticalOffset = (this.props.verticalOffset || 0) - displayAreaOffset.y;
                        horizontalOffset = -displayAreaOffset.x;
                        this.debug('calculateRectFromRef - waiting for ref to move');
                        count = 0;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, getRectForRef(fromRef)];
                    case 5:
                        rect = _a.sent();
                        rect = new Rect(rect.x + horizontalOffset, rect.y + verticalOffset, rect.width, rect.height);
                        if (count++ > 20)
                            return [2 /*return*/]; // Timeout after 2 seconds
                        _a.label = 6;
                    case 6:
                        if (Rect.equals(rect, initialRect)) return [3 /*break*/, 4];
                        _a.label = 7;
                    case 7:
                        this.debug('calculateRectFromRef - calculated Rect', rect);
                        if (this._isMounted)
                            this.setState({ fromRect: rect });
                        return [2 /*return*/];
                }
            });
        });
    };
    AdaptivePopover.prototype.render = function () {
        var _this = this;
        var _a = this.props, onOpenStart = _a.onOpenStart, onCloseStart = _a.onCloseStart, fromRef = _a.fromRef, extraView = _a.extraView, otherProps = __rest(_a, ["onOpenStart", "onCloseStart", "fromRef", "extraView"]);
        var fromRect = this.state.fromRect;
        // Don't render popover until we have an initial fromRect calculated for the view
        if (fromRef && !fromRect)
            return null;
        return (React.createElement(BasePopover, __assign({}, otherProps, { displayArea: this.getDisplayArea(), fromRect: fromRect, onOpenStart: function () {
                onOpenStart && onOpenStart();
                _this.debug("Setting up keyboard listeners");
                _this.displayAreaStore = _this.getDisplayArea();
            }, onCloseStart: function () {
                onCloseStart && onCloseStart();
                _this.debug("Tearing down keyboard listeners");
                if (_this._isMounted)
                    _this.setState({ shiftedDisplayArea: null });
            }, skipMeasureContent: function () { return _this.waitForResizeToFinish; }, extraView: extraView, safeAreaViewContents: (React.createElement(TouchableWithoutFeedback, { style: { flex: 1 }, onLayout: function (evt) { return _this.setDefaultDisplayArea(new Rect(evt.nativeEvent.layout.x + 10, evt.nativeEvent.layout.y + 10, evt.nativeEvent.layout.width - 20, evt.nativeEvent.layout.height - 20)); } },
                React.createElement(View, { style: { flex: 1 } }))) })));
    };
    return AdaptivePopover;
}(Component));
var BasePopover = /** @class */ (function (_super) {
    __extends(BasePopover, _super);
    function BasePopover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            requestedContentSize: null,
            activeGeom: undefined,
            nextGeom: undefined,
            showing: false,
            animatedValues: {
                scale: new Animated.Value(0),
                translate: new Animated.ValueXY(),
                fade: new Animated.Value(0),
                translateArrow: new Animated.ValueXY()
            }
        };
        _this._isMounted = false;
        _this.animating = false;
        _this.animateOutAfterShow = false;
        _this.popoverRef = React.createRef();
        _this.arrowRef = React.createRef();
        return _this;
    }
    BasePopover.prototype.debug = function (line, obj) {
        if (DEBUG || this.props.debug)
            console.log("[" + (new Date()).toISOString() + "] " + line + (obj ? ": " + JSON.stringify(obj) : ''));
    };
    BasePopover.prototype.componentDidMount = function () {
        this._isMounted = true;
    };
    BasePopover.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        // Make sure a value we care about has actually changed
        var importantProps = ["isVisible", "fromRect", "displayArea", "verticalOffset", "placement"];
        if (!importantProps.reduce(function (acc, key) { return acc || _this.props[key] !== prevProps[key]; }, false))
            return;
        if (this.props.isVisible !== prevProps.isVisible) {
            if (this.props.isVisible) {
                this.debug("componentDidUpdate - isVisible changed, now true");
                // We want to start the show animation only when contentSize is known
                // so that we can have some logic depending on the geometry
                this.debug("componentDidUpdate - setting visible and awaiting calculations");
            }
            else {
                this.debug("componentDidUpdate - isVisible changed, now false");
                if (this.state.showing)
                    this.animateOut();
                else
                    this.animateOutAfterShow = true;
                this.debug("componentDidUpdate - Hiding popover");
            }
        }
        else if (this.props.isVisible && prevProps.isVisible) {
            this.handleChange();
        }
    };
    BasePopover.prototype.componentWillUnmount = function () {
        this._isMounted = false;
        if (this.state.showing) {
            this.animateOut();
        }
        else {
            setTimeout(this.props.onCloseStart);
            setTimeout(this.props.onCloseComplete);
        }
    };
    BasePopover.prototype.measureContent = function (requestedContentSize) {
        var _this = this;
        if (!requestedContentSize.width)
            console.warn("Popover Warning - Can't Show - The Popover content has a width of 0, so there is nothing to present.");
        if (!requestedContentSize.height)
            console.warn("Popover Warning - Can't Show - The Popover content has a height of 0, so there is nothing to present.");
        if (this.props.skipMeasureContent()) {
            this.debug("measureContent - Skippting, waiting for resize to finish");
            return;
        }
        if (requestedContentSize.width && requestedContentSize.height) {
            this.debug("measureContent - new requestedContentSize: " + JSON.stringify(requestedContentSize) + " (used to be " + JSON.stringify(this.state.requestedContentSize) + ")");
            this.setState({ requestedContentSize: requestedContentSize }, function () { return _this.handleChange(); });
        }
    };
    // Many factors may cause the geometry to change.  This function collects all of them, waiting for 200ms after the last change,
    //  then takes action, either bringing up the popover or moving it to its new location
    BasePopover.prototype.handleChange = function () {
        var _this = this;
        if (this.handleChangeTimeout)
            clearTimeout(this.handleChangeTimeout);
        if (!this.state.requestedContentSize) {
            // this function will be called again once we have a requested content size, so safe to ignore for now
            this.debug("handleChange - no requestedContentSize, exiting...");
            return;
        }
        this.debug("handleChange - waiting 100ms to accumulate all changes");
        this.handleChangeTimeout = setTimeout(function () {
            var _a = _this.state, activeGeom = _a.activeGeom, animatedValues = _a.animatedValues, requestedContentSize = _a.requestedContentSize;
            var _b = _this.props, arrowStyle = _b.arrowStyle, popoverStyle = _b.popoverStyle, fromRect = _b.fromRect, displayArea = _b.displayArea, placement = _b.placement, onOpenStart = _b.onOpenStart, arrowShift = _b.arrowShift;
            if (requestedContentSize) {
                _this.debug("handleChange - requestedContentSize", requestedContentSize);
                _this.debug("handleChange - displayArea", displayArea);
                _this.debug("handleChange - fromRect", fromRect);
                if (placement)
                    _this.debug("handleChange - placement", placement.toString());
                var geom_1 = computeGeometry({
                    requestedContentSize: requestedContentSize,
                    placement: placement,
                    fromRect: fromRect,
                    displayArea: displayArea,
                    arrowStyle: arrowStyle,
                    popoverStyle: popoverStyle,
                    arrowShift: arrowShift,
                    debug: _this.debug.bind(_this),
                    previousPlacement: _this.getGeom().placement
                });
                _this.setState({ nextGeom: geom_1, requestedContentSize: requestedContentSize }, function () {
                    if (geom_1.viewLargerThanDisplayArea.width || geom_1.viewLargerThanDisplayArea.height) {
                        // If the view initially overflowed the display area, wait one more render cycle to test-render it within the display area to get
                        //  final calculations for popoverOrigin before show
                        _this.debug("handleChange - delaying showing popover because viewLargerThanDisplayArea");
                    }
                    else if (!activeGeom) {
                        _this.debug("handleChange - animating in");
                        setTimeout(onOpenStart);
                        _this.animateIn();
                    }
                    else if (activeGeom && !Geometry.equals(activeGeom, geom_1)) {
                        var moveTo = new Point(geom_1.popoverOrigin.x, geom_1.popoverOrigin.y);
                        _this.debug("handleChange - Triggering popover move to", moveTo);
                        _this.animateTo({
                            values: animatedValues,
                            fade: 1,
                            scale: 1,
                            translatePoint: moveTo,
                            easing: Easing.inOut(Easing.quad),
                            geom: geom_1
                        });
                    }
                    else {
                        _this.debug("handleChange - no change");
                    }
                });
            }
        }, 100);
    };
    BasePopover.prototype.getPolarity = function () {
        return I18nManager.isRTL ? -1 : 1;
    };
    BasePopover.prototype.getGeom = function () {
        var _a = this.state, activeGeom = _a.activeGeom, nextGeom = _a.nextGeom;
        if (activeGeom)
            return activeGeom;
        if (nextGeom)
            return nextGeom;
        return new Geometry({
            popoverOrigin: new Point(0, 0),
            anchorPoint: new Point(0, 0),
            placement: Placement.AUTO,
            forcedContentSize: null,
            viewLargerThanDisplayArea: {
                width: false,
                height: false
            }
        });
    };
    BasePopover.prototype.getArrowDynamicStyle = function () {
        var placement = this.getGeom().placement;
        var _a = this.props, arrowStyle = _a.arrowStyle, popoverStyle = _a.popoverStyle;
        var _b = this.getCalculatedArrowDims(), width = _b.width, height = _b.height;
        var backgroundColor = StyleSheet.flatten(arrowStyle).backgroundColor || StyleSheet.flatten(popoverStyle).backgroundColor || styles.popoverContent.backgroundColor;
        var colors = {};
        switch (placement) {
            case Placement.TOP:
                colors = { borderTopColor: backgroundColor };
                break;
            case Placement.BOTTOM:
                colors = { borderBottomColor: backgroundColor };
                break;
            case Placement.LEFT:
                colors = { borderLeftColor: backgroundColor };
                break;
            case Placement.RIGHT:
                colors = { borderRightColor: backgroundColor };
                break;
            default:
        }
        // Create the arrow from a rectangle with the appropriate borderXWidth set
        // A rotation is then applied dependending on the placement
        // Also make it slightly bigger
        // to fix a visual artifact when the popover is animated with a scale
        return __assign({ width: width, height: height, borderTopWidth: height / 2, borderRightWidth: width / 2, borderBottomWidth: height / 2, borderLeftWidth: width / 2 }, colors);
    };
    BasePopover.prototype.getCalculatedArrowDims = function () {
        var placement = this.getGeom().placement;
        var arrowSize = getArrowSize(placement, this.props.arrowStyle);
        switch (placement) {
            case Placement.LEFT:
            case Placement.RIGHT:
                arrowSize.height += 2;
                arrowSize.width = arrowSize.width * 2 + 2;
                break;
            default:
                arrowSize.width += 2;
                arrowSize.height = arrowSize.height * 2 + 2;
        }
        return arrowSize;
    };
    BasePopover.prototype.getArrowTranslateLocation = function (translatePoint, geom) {
        if (translatePoint === void 0) { translatePoint = null; }
        var requestedContentSize = this.state.requestedContentSize;
        var anchorPoint = geom.anchorPoint, placement = geom.placement, forcedContentSize = geom.forcedContentSize, viewLargerThanDisplayArea = geom.viewLargerThanDisplayArea;
        var _a = this.getCalculatedArrowDims(), arrowWidth = _a.width, arrowHeight = _a.height;
        var viewWidth = 0;
        if (viewLargerThanDisplayArea.width && forcedContentSize !== null && forcedContentSize.width)
            viewWidth = forcedContentSize.width;
        else if (requestedContentSize !== null && requestedContentSize.width)
            viewWidth = requestedContentSize.width;
        var viewHeight = 0;
        if (viewLargerThanDisplayArea.height && forcedContentSize !== null && forcedContentSize.height)
            viewHeight = forcedContentSize.height;
        else if (requestedContentSize !== null && requestedContentSize.height)
            viewHeight = requestedContentSize.height;
        var arrowX = anchorPoint.x - arrowWidth / 2;
        var arrowY = anchorPoint.y - arrowHeight / 2;
        var borderRadius = getBorderRadius(this.props.popoverStyle);
        // Ensuring that the arrow does not go outside the bounds of the content box during a move
        if (translatePoint) {
            if (placement === Placement.LEFT || placement === Placement.RIGHT) {
                if (translatePoint.y > (arrowY - borderRadius))
                    arrowY = translatePoint.y + borderRadius;
                else if (viewHeight && translatePoint.y + viewHeight < arrowY + arrowHeight)
                    arrowY = translatePoint.y + viewHeight - arrowHeight - borderRadius;
            }
            else if (placement === Placement.TOP || placement === Placement.BOTTOM) {
                if (translatePoint.x > arrowX - borderRadius)
                    arrowX = translatePoint.x + borderRadius;
                else if (viewWidth && translatePoint.x + viewWidth < arrowX + arrowWidth)
                    arrowX = translatePoint.x + viewWidth - arrowWidth - borderRadius;
            }
        }
        return new Point(arrowX, (FIX_SHIFT * 2) /* Temp fix for useNativeDriver issue */ + arrowY);
    };
    BasePopover.prototype.getTranslateOrigin = function () {
        var requestedContentSize = this.state.requestedContentSize;
        var _a = this.getGeom(), forcedContentSize = _a.forcedContentSize, viewLargerThanDisplayArea = _a.viewLargerThanDisplayArea, popoverOrigin = _a.popoverOrigin, anchorPoint = _a.anchorPoint;
        var viewWidth = 0;
        if (viewLargerThanDisplayArea.width && forcedContentSize !== null && forcedContentSize.width)
            viewWidth = forcedContentSize.width;
        else if (requestedContentSize !== null && requestedContentSize.width)
            viewWidth = requestedContentSize.width;
        var viewHeight = 0;
        if (viewLargerThanDisplayArea.height && forcedContentSize !== null && forcedContentSize.height)
            viewHeight = forcedContentSize.height;
        else if (requestedContentSize !== null && requestedContentSize.height)
            viewHeight = requestedContentSize.height;
        var popoverCenter = new Point(popoverOrigin.x + (viewWidth / 2), popoverOrigin.y + (viewHeight / 2));
        var shiftHorizontal = anchorPoint.x - popoverCenter.x;
        var shiftVertical = anchorPoint.y - popoverCenter.y;
        this.debug("getTranslateOrigin - popoverOrigin", popoverOrigin);
        this.debug("getTranslateOrigin - popoverSize", { width: viewWidth, height: viewHeight });
        this.debug("getTranslateOrigin - anchorPoint", anchorPoint);
        this.debug("getTranslateOrigin - shift", { hoizontal: shiftHorizontal, vertical: shiftVertical });
        return new Point(popoverOrigin.x + shiftHorizontal, popoverOrigin.y + shiftVertical);
    };
    BasePopover.prototype.animateOut = function () {
        var _this = this;
        setTimeout(this.props.onCloseStart);
        if (this._isMounted)
            this.setState({ showing: false });
        this.animateTo({
            values: this.state.animatedValues,
            fade: 0,
            scale: 0,
            translatePoint: this.getTranslateOrigin(),
            callback: function () {
                _this.props.onCloseComplete && _this.props.onCloseComplete();
            },
            easing: Easing.inOut(Easing.quad),
            geom: this.getGeom()
        });
    };
    BasePopover.prototype.animateIn = function () {
        var _this = this;
        var nextGeom = this.state.nextGeom;
        if (nextGeom instanceof Geometry) {
            var values = this.state.animatedValues;
            // Should grow from anchor point
            var translateStart = this.getTranslateOrigin();
            translateStart.y += (FIX_SHIFT * 2); // Temp fix for useNativeDriver issue
            values.translate.setValue(translateStart);
            var translatePoint = new Point(nextGeom.popoverOrigin.x, nextGeom.popoverOrigin.y);
            values.translateArrow.setValue(this.getArrowTranslateLocation(translatePoint, nextGeom));
            this.animateTo({
                values: values,
                fade: 1,
                scale: 1,
                translatePoint: translatePoint,
                easing: Easing.out(Easing.back(1)),
                geom: nextGeom,
                callback: function () {
                    if (_this._isMounted) {
                        _this.setState({ showing: true });
                        if (_this.props.debug || DEBUG) {
                            setTimeout(function () { return _this.popoverRef.current && getRectForRef(_this.popoverRef).then(function (rect) { return _this.debug("animateIn - onOpenComplete - Calculated Popover Rect", rect); }); });
                            setTimeout(function () { return _this.arrowRef.current && getRectForRef(_this.arrowRef).then(function (rect) { return _this.debug("animateIn - onOpenComplete - Calculated Arrow Rect", rect); }); });
                        }
                    }
                    setTimeout(_this.props.onOpenComplete);
                    if (_this.animateOutAfterShow || !_this._isMounted) {
                        _this.animateOut();
                        _this.animateOutAfterShow = false;
                    }
                }
            });
        }
    };
    BasePopover.prototype.animateTo = function (args) {
        var _this = this;
        var fade = args.fade, translatePoint = args.translatePoint, scale = args.scale, callback = args.callback, easing = args.easing, values = args.values, geom = args.geom;
        var commonConfig = __assign({ duration: 300, easing: easing, useNativeDriver: !isWeb }, this.props.animationConfig);
        if (this.animating) {
            setTimeout(function () { return _this.animateTo(args); }, 100);
            return;
        }
        var newArrowLocation = this.getArrowTranslateLocation(translatePoint, geom);
        translatePoint.y = translatePoint.y + (FIX_SHIFT * 2); // Temp fix for useNativeDriver issue
        if (!fade && fade !== 0) {
            console.log("Popover: Fade value is null");
            return;
        }
        if (!translatePoint) {
            console.log("Popover: Translate Point value is null");
            return;
        }
        if (!scale && scale !== 0) {
            console.log("Popover: Scale value is null");
            return;
        }
        this.animating = true;
        Animated.parallel([
            Animated.timing(values.fade, __assign(__assign({}, commonConfig), { toValue: fade })),
            Animated.timing(values.translate, __assign(__assign({}, commonConfig), { toValue: translatePoint })),
            Animated.timing(values.scale, __assign(__assign({}, commonConfig), { toValue: scale })),
            Animated.timing(values.translateArrow, __assign(__assign({}, commonConfig), { toValue: newArrowLocation }))
        ]).start(function () {
            _this.animating = false;
            if (_this._isMounted)
                _this.setState({ activeGeom: _this.state.nextGeom });
            if (callback)
                callback();
        });
    };
    BasePopover.prototype.render = function () {
        var _this = this;
        var geom = this.getGeom();
        var _a = this.state, animatedValues = _a.animatedValues, nextGeom = _a.nextGeom;
        var _b = this.props, popoverStyle = _b.popoverStyle, extraView = _b.extraView;
        var _c = this.getCalculatedArrowDims(), arrowWidth = _c.width, arrowHeight = _c.height;
        var arrowScale = animatedValues.scale.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        var arrowViewStyle = __assign(__assign({ position: 'absolute', top: 0 }, (I18nManager.isRTL ? { right: 0 } : { left: 0 })), { width: arrowWidth, height: arrowHeight, transform: [
                { translateX: animatedValues.translateArrow.x },
                { translateY: animatedValues.translateArrow.y },
                { scale: arrowScale },
            ] });
        var arrowInnerStyle = [
            styles.arrow,
            this.getArrowDynamicStyle()
        ];
        // Temp fix for useNativeDriver issue
        var backgroundShift = animatedValues.fade.interpolate({
            inputRange: [0, 0.0001, 1],
            outputRange: [0, FIX_SHIFT, FIX_SHIFT]
        });
        var backgroundStyle = __assign(__assign(__assign({}, styles.background), { transform: [
                { translateY: backgroundShift }
            ] }), StyleSheet.flatten(this.props.backgroundStyle));
        var containerStyle = __assign(__assign({}, styles.container), { opacity: animatedValues.fade });
        var popoverViewStyle = __assign(__assign(__assign(__assign({ position: 'absolute' }, styles.dropShadow), styles.popoverContent), StyleSheet.flatten(popoverStyle)), { transform: [
                { translateX: animatedValues.translate.x },
                { translateY: animatedValues.translate.y },
                { scale: animatedValues.scale },
                { perspective: 1000 }
            ] });
        // We want to always use next here, because the we need this to re-render before we can animate to the correct spot for the active.
        if (nextGeom) {
            popoverViewStyle.maxWidth = (nextGeom.forcedContentSize || { width: null }).width || undefined;
            popoverViewStyle.maxHeight = (nextGeom.forcedContentSize || { height: null }).height || undefined;
        }
        return (React.createElement(View, { pointerEvents: "box-none", style: [styles.container, { left: 0 }] },
            React.createElement(SafeAreaView, { pointerEvents: "none", forceInset: this.props.safeAreaInsets, style: { position: 'absolute', top: FIX_SHIFT, left: 0, right: 0, bottom: 0 } }, this.props.safeAreaViewContents),
            React.createElement(Animated.View, { pointerEvents: "box-none", style: containerStyle },
                this.props.showBackground && (React.createElement(TouchableWithoutFeedback, { onPress: this.props.onRequestClose },
                    React.createElement(Animated.View, { style: backgroundStyle }))),
                React.createElement(View, { pointerEvents: "box-none", style: { top: 0, left: 0 } },
                    React.createElement(Animated.View, { style: popoverViewStyle, ref: this.popoverRef, onLayout: function (evt) {
                            var layout = __assign({}, evt.nativeEvent.layout);
                            setTimeout(function () { return _this._isMounted && _this.measureContent(layout); }, 10);
                        } }, this.props.children),
                    geom.placement !== Placement.CENTER &&
                        React.createElement(Animated.View, { style: arrowViewStyle, ref: this.arrowRef },
                            React.createElement(Animated.View, { style: arrowInnerStyle })))),
            extraView));
    };
    BasePopover.defaultProps = {
        showBackground: true,
        placement: Placement.AUTO,
        verticalOffset: 0,
        popoverStyle: {},
        arrowStyle: {},
        backgroundStyle: {},
        onOpenStart: noop,
        onOpenComplete: noop,
        onRequestClose: noop,
        onCloseStart: noop,
        onCloseComplete: noop,
        debug: false
    };
    return BasePopover;
}(Component));
var styles = StyleSheet.create({
    container: {
        top: -1 * FIX_SHIFT,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'transparent'
    },
    background: {
        top: 0,
        bottom: FIX_SHIFT,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    contentContainer: {
        flexDirection: 'column',
    },
    popoverContainer: {
        position: 'absolute',
        zIndex: 1000
    },
    popoverContent: {
        backgroundColor: 'white',
        borderBottomColor: '#333438',
        borderRadius: DEFAULT_BORDER_RADIUS,
        overflow: 'hidden'
    },
    selectContainer: {
        backgroundColor: '#f2f2f2',
        position: 'absolute'
    },
    dropShadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.8
    },
    arrow: {
        position: 'absolute',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent'
    }
});
//# sourceMappingURL=Popover.js.map