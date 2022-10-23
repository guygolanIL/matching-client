import React, { useRef } from "react";
import {
    TouchableOpacity,
    useWindowDimensions,
    Image,
    View,
    Text,
    Button,
    Animated,
} from "react-native";

import { useSocketContext } from "./socket";
import socketImageSource from '../../assets/images/socket.png';
import { useDrag } from "../../hooks/useDrag";
import { PropsWithChildren } from "react";

const socketImageUri = Image.resolveAssetSource(socketImageSource).uri

/**
 * make sure this has access to SocketContext
 * 
 */
export function SocketDevTools() {
    const socketContext = useSocketContext();
    const shouldShow = process.env.NODE_ENV === 'development';
    const { panResponder, pan } = useDrag();

    const overlayWidthPercentage = 0.8;
    const overlayWidth = useWindowDimensions().width * overlayWidthPercentage;
    const overlayClosedOffset = overlayWidth * -1;
    const overlayOffset = useRef(new Animated.Value(overlayClosedOffset)).current;

    function SocketButton(props: { onClick: () => void }) {

        return (
            <Animated.View
                style={{
                    transform: [
                        { translateX: pan.x },
                        { translateY: pan.y }
                    ],
                    backgroundColor: 'white',
                    borderColor: socketContext.isConnected ? '#39e81a' : '#f7423b',
                    borderWidth: 2,
                    borderRadius: 50,
                    elevation: 4,
                    position: 'absolute',
                    top: useWindowDimensions().height / 2,
                    right: 0
                }}
                {...panResponder.panHandlers}
            >
                <TouchableOpacity
                    onPress={props.onClick}
                >
                    <Image
                        source={{ uri: socketImageUri }}
                        style={{
                            height: 50,
                            width: 50,
                        }}
                    />
                </TouchableOpacity>
            </Animated.View>
        );
    }

    function DevToolsOverlay(props: PropsWithChildren<{ onClose: () => void }>) {

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: overlayWidth,
                    height: '100%',
                    backgroundColor: 'white',
                    borderColor: '#e3e3e3',
                    borderWidth: 1,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 60,
                    transform: [{ translateX: overlayOffset }]
                }}
            >
                <View style={{ marginBottom: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold' }}>Socket info</Text>
                    <Button title="Close" onPress={props.onClose} />
                </View>
                {props.children}
            </Animated.View>
        );
    }

    return (
        shouldShow ? (
            <>
                <SocketButton onClick={() => {
                    Animated.timing(overlayOffset, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }} />
                <DevToolsOverlay onClose={() => {
                    Animated.timing(overlayOffset, {
                        toValue: overlayClosedOffset,
                        useNativeDriver: false,
                    }).start();
                }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text>{socketContext.isConnected ? `Connected as ${socketContext._socket?.id}` : "Disconnected"}</Text>
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Incoming Events: {socketContext.history.length}</Text>
                        {socketContext.history.map((eventName, idx) => (
                            <Text key={idx}>{eventName}</Text>
                        ))}
                    </View>
                </DevToolsOverlay>
            </>
        ) : null
    );
}