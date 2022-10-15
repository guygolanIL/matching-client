import { useRef, useState } from 'react';
import { Animated, PanResponder, useWindowDimensions, ViewStyle } from 'react-native';
import AttitudeIcon from '@expo/vector-icons/AntDesign';

import * as Styling from '../../../../components/design-system/style';
import { Attitude } from '../../../../data/feed/api';
import { useFadeIn } from '../../../../components/design-system/style/animations/useFadeIn';

const comeTomorrowImageUri = "https://res.cloudinary.com/dnsshs5nw/image/upload/v1665147206/5ujmu3thwd571_q0lkkh.png";

type Props = {
    stack: Array<{ uri: string; id: number; }>;
    onImageSlided: (id: number, direction: 'right' | 'left') => void;
}
const useStyles = Styling.createStyles(({ theme }) => ({
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        borderRadius: theme.shape.borderRadius.smooth,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
}));

export function ImageStack(props: Props) {
    const styles = useStyles();
    const fadeIn = useFadeIn();
    const theme = Styling.useTheme();
    const screenWidth = useWindowDimensions().width;
    const panThreshold = screenWidth * 0.5;
    const { stack, onImageSlided } = props;
    const [currentImage, setCurrentImage] = useState(0);

    stack.push({
        id: -1,
        uri: comeTomorrowImageUri,
    });

    const lastItem = currentImage === stack.length - 1;

    const pan = useRef(new Animated.Value(0)).current;
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
            [
                null,
                { dx: pan }
            ],
            {
                useNativeDriver: false
            }
        ),
        onPanResponderRelease: (e, gestureState) => {

            if (Math.abs(gestureState.dx) > panThreshold) {
                const throwCardPosition = screenWidth + 200;

                const direction: 'right' | 'left' = gestureState.dx > 0 ? 'right' : 'left';
                const toValue = direction === 'right' ? throwCardPosition : -throwCardPosition;

                Animated.spring(pan, { toValue, useNativeDriver: false, bounciness: 0, }).start((result) => {
                    setCurrentImage(oldIndex => {
                        onImageSlided(stack[oldIndex]?.id, direction);
                        return oldIndex + 1;
                    });
                    pan.setValue(0);
                });
            } else {
                Animated.spring(pan, { toValue: 0, useNativeDriver: false, }).start();
            }
        }
    });

    function getOpacity(index: number) {
        const faded = pan.interpolate({ inputRange: [-300, -1, 0, 1, 300], outputRange: [1, 0.8, 0, 0.8, 1], extrapolate: 'clamp' });
        if (index === 1) return faded; // if the next one

        if (index === 0) return 1; // if the current one

        return 0;

    }

    function getTransform(index: number) {
        const firstImage = [
            { translateX: pan },
            { rotateZ: pan.interpolate({ inputRange: [-1, 1], outputRange: ['-0.1deg', '0.1deg'] }) }
        ];

        if (index === 0) return firstImage;

        const upNext = [
            { scale: pan.interpolate({ inputRange: [-panThreshold, 0, panThreshold], outputRange: [1, 0.9, 1], extrapolate: 'clamp' }) }
        ];
        if (index === 1) return upNext;

        return [{ scale: 0.9 }];
    }

    if (lastItem) return (
        <Animated.View style={{
            ...styles.imageContainer,
            opacity: fadeIn
        }}>
            <Animated.Image
                style={{
                    ...styles.image,
                }}
                source={{ uri: stack[currentImage].uri }}
            />
        </Animated.View>
    );
    const twoItems = [...stack].splice(currentImage, 2);

    return (
        <Animated.View
            style={{
                ...styles.imageContainer,
                opacity: fadeIn
            }}
            {...panResponder.panHandlers}
        >
            {twoItems.map(({ id, uri }, index) => {
                return (
                    <Animated.Image
                        key={index}
                        style={{
                            ...styles.image,
                            zIndex: index === 0 ? 10 : 0,
                            transform: getTransform(index),
                            opacity: getOpacity(index)
                        }}

                        source={{ uri }}
                    />
                );
            })}

            {!lastItem && (
                <>
                    <AttitudeFab
                        attitude='NEGATIVE'
                        style={{
                            position: 'absolute',
                            top: '50%',
                            zIndex: 10,
                            color: 'grey',
                            opacity: pan.interpolate({ inputRange: [-100, -20, 0, 100], outputRange: [1, 0, 0, 0] }),
                            transform: [{ translateX: pan.interpolate({ inputRange: [-400, -panThreshold, 0], outputRange: [-100, 20, -100] }) }]
                        }}
                    />

                    <AttitudeFab
                        attitude='POSITIVE'
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            zIndex: 10,
                            color: theme.palette.primary.main,
                            opacity: pan.interpolate({ inputRange: [-100, 0, 20, 100], outputRange: [0, 0, 0, 1] }),
                            transform: [{ translateX: pan.interpolate({ inputRange: [0, panThreshold, 400], outputRange: [100, -20, 100] }) }]
                        }}
                    />
                </>
            )}

        </Animated.View>
    );
}

function AttitudeFab(props: { attitude: Attitude; style?: Animated.WithAnimatedObject<ViewStyle> & { color?: string } }) {
    const iconName = props.attitude === 'POSITIVE' ? 'like2' : 'dislike2';
    return (
        <Animated.View style={{
            padding: 20,
            borderRadius: 50,
            borderWidth: 7,
            backgroundColor: 'white',
            borderColor: props.style?.color,
            ...props.style,
        }}>
            <AttitudeIcon name={iconName} size={50} color={props.style?.color} />
        </Animated.View>
    );
}
