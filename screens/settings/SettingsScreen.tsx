import { View } from "react-native";
import { Button } from "../../components/design-system/Button/Button";
import { useAuth } from "../../contexts/auth";

export function SettingsScreen() {
    const { signOut } = useAuth();

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{ marginTop: 'auto' }}>
                <Button label="Logout" onPress={() => signOut.mutate()} />

            </View>
        </View>
    );
}