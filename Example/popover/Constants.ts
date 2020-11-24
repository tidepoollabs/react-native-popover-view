import { Dimensions } from 'react-native';

export const MULTIPLE_POPOVER_WARNING = "Popover Warning - Can't Show - Attempted to show a Popover while another one was already showing.  You can only show one Popover at a time, and must wait for one to close completely before showing a different one.  You can use the onCloseComplete prop to detect when a Popover has finished closing.  To show multiple Popovers simultaneously, all but one should have mode={Popover.MODE.JS_MODAL}.  Once you change the mode, you can show as many Popovers as you want, but you are responsible for keeping them above other views.";

export enum Placement {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
  AUTO = 'auto',
  CENTER = 'center'
}

export enum Mode {
  JS_MODAL = 'js-modal',
  RN_MODAL = 'rn-modal',
  TOOLTIP = 'tooltip'
}

export const DEFAULT_ARROW_SIZE = { width: 16, height: 8 };
export const DEFAULT_BORDER_RADIUS = 3;
export const FIX_SHIFT = Dimensions.get('window').height * 2;

