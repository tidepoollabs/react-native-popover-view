export declare const MULTIPLE_POPOVER_WARNING = "Popover Warning - Can't Show - Attempted to show a Popover while another one was already showing.  You can only show one Popover at a time, and must wait for one to close completely before showing a different one.  You can use the onCloseComplete prop to detect when a Popover has finished closing.  To show multiple Popovers simultaneously, all but one should have mode={Popover.MODE.JS_MODAL}.  Once you change the mode, you can show as many Popovers as you want, but you are responsible for keeping them above other views.";
export declare enum Placement {
    TOP = "top",
    RIGHT = "right",
    BOTTOM = "bottom",
    LEFT = "left",
    AUTO = "auto",
    CENTER = "center"
}
export declare enum Mode {
    JS_MODAL = "js-modal",
    RN_MODAL = "rn-modal",
    TOOLTIP = "tooltip"
}
export declare const DEFAULT_ARROW_SIZE: {
    width: number;
    height: number;
};
export declare const DEFAULT_BORDER_RADIUS = 3;
export declare const FIX_SHIFT: number;
