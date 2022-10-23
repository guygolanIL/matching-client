import { useRef } from "react";
import { Animated, PanResponder } from "react-native";

export function useDrag() {
    const pan = useRef(new Animated.ValueXY({
        x: 0,
        y: 0,
    })).current;
    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: (e, gestureState) => {
            const sensitivity = 10;
            return (
                Math.abs(gestureState.dx) > sensitivity
                || Math.abs(gestureState.dy) > sensitivity
            );
        },
        onPanResponderGrant: () => {
            pan.setOffset({
                x: (pan.x as any)._value,
                y: (pan.y as any)._value
            });
        },
        onPanResponderMove: Animated.event(
            [
                null,
                { dx: pan.x, dy: pan.y }
            ],
            {
                useNativeDriver: false,
            }
        ),
        onPanResponderRelease: () => {
            pan.flattenOffset();
        }
    })).current;

    return {
        pan,
        panResponder,
    };
}