import { Component, RefObject, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaViewProps } from 'react-native-safe-area-view';
import { Animated, View, StyleProp, ViewStyle } from 'react-native';
import { Rect } from './Utility';
import { Placement, Mode } from './Constants';
interface PopoverProps {
    isVisible?: boolean;
    placement?: Placement;
    animationConfig?: Partial<Animated.TimingAnimationConfig>;
    verticalOffset?: number;
    safeAreaInsets?: SafeAreaViewProps["forceInset"];
    popoverStyle?: StyleProp<ViewStyle>;
    arrowStyle?: StyleProp<ViewStyle>;
    backgroundStyle?: StyleProp<ViewStyle>;
    arrowShift?: number;
    onOpenStart?: () => void;
    onOpenComplete?: () => void;
    onRequestClose?: () => void;
    onCloseStart?: () => void;
    onCloseComplete?: () => void;
    debug?: boolean;
}
interface PublicPopoverProps extends PopoverProps {
    mode?: Mode;
    displayArea?: Rect;
    extraView: ReactNode;
    from?: Rect | RefObject<View> | ((sourceRef: RefObject<View>, openPopover: () => void) => ReactNode) | ReactNode;
}
interface PublicPopoverState {
    isVisible: boolean;
}
export default class Popover extends Component<PublicPopoverProps, PublicPopoverState> {
    static propTypes: {
        isVisible: PropTypes.Requireable<boolean>;
        from: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        displayArea: PropTypes.Requireable<Required<PropTypes.InferProps<{
            x: PropTypes.Requireable<number>;
            y: PropTypes.Requireable<number>;
            width: PropTypes.Requireable<number>;
            height: PropTypes.Requireable<number>;
        }>>>;
        placement: PropTypes.Requireable<Placement>;
        animationConfig: PropTypes.Requireable<object>;
        verticalOffset: PropTypes.Requireable<number>;
        safeAreaInsets: PropTypes.Requireable<object>;
        popoverStyle: any;
        arrowStyle: any;
        backgroundStyle: any;
        arrowShift: PropTypes.Requireable<number>;
        onOpenStart: PropTypes.Requireable<(...args: any[]) => any>;
        onOpenComplete: PropTypes.Requireable<(...args: any[]) => any>;
        onRequestClose: PropTypes.Requireable<(...args: any[]) => any>;
        onCloseStart: PropTypes.Requireable<(...args: any[]) => any>;
        onCloseComplete: PropTypes.Requireable<(...args: any[]) => any>;
        extraView: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        debug: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        mode: Mode;
        onOpenStart: () => void;
        onOpenComplete: () => void;
        onRequestClose: () => void;
        onCloseStart: () => void;
        onCloseComplete: () => void;
        verticalOffset: number;
        debug: boolean;
    };
    state: {
        isVisible: boolean;
    };
    private sourceRef;
    render(): JSX.Element;
}
export {};
