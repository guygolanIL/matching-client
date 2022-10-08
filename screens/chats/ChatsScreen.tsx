import { Text, View } from "react-native";
import { Button } from "../../components/design-system/Button/Button";
import { useChat } from "./useChat";

export function ChatsScreen() {
    const { socket, isConnected, lastPong } = useChat();


    return (
        <View>
            <Text>chat</Text>
            <Text>{isConnected ? "connected" : "disconnected"}</Text>
            <Text>{lastPong}</Text>
            <Button label="ping" onPress={() => socket?.emit('message', "asd")} />
        </View>
    );
}