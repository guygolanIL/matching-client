import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { Button } from '../../components/Button/Button';
import { View } from '../../components/Themed';
import { useAuth } from '../../contexts/auth';

const AppStack = createNativeStackNavigator();

function HelloWorld() {
    const auth = useAuth();

    return (
        <View>
            <Text>Hello</Text>
            <Button label='sign out' onPress={() => auth.signOut()} />
        </View>
    )
}

export function AppNavigator() {
    return (
        <AppStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <AppStack.Screen name='AppRoot' component={HelloWorld} />
        </AppStack.Navigator>
    );
}