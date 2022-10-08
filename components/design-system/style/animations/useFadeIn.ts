import { useLayoutEffect, useRef } from "react";
import { Animated } from "react-native";

export function useFadeIn() {
    const fadeIn = useRef(new Animated.Value(0)).current;

    useLayoutEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            useNativeDriver: false,
        }).start();
    }, []);

    return fadeIn;
}