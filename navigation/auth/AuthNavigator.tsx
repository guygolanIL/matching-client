import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { SigninScreen } from "../../screens/auth/SigninScreen";
import { SignupScreen } from "../../screens/auth/SignupScreen";

export type AuthScreenProps<T extends keyof AuthScreensParams> = NativeStackScreenProps<AuthScreensParams, T, 'auth'>;

export type AuthScreensParams = {
    Signin: undefined;
    Signup: undefined;
};

const AuthStack = createNativeStackNavigator<AuthScreensParams>();

export function AuthNavigator() {
    return (
        <AuthStack.Navigator id='auth'>
            <AuthStack.Screen options={{ headerShown: false, animation: 'slide_from_left' }} name="Signin" component={SigninScreen} />
            <AuthStack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="Signup" component={SignupScreen} />
        </AuthStack.Navigator>
    );
}
