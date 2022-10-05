import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Button } from "../../components/design-system/Button/Button";
import { useAuth } from "../../contexts/auth";

export function SettingsScreen() {
    const { signOut } = useAuth();

    return (
        <View>
            <Button label="Logout" onPress={() => signOut.mutate()} />
        </View>
    );
}