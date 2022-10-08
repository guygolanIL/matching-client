import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";

import { SigninScreen } from "../../screens/auth/SigninScreen";
import { SignupScreen } from "../../screens/auth/SignupScreen";

export type AuthScreenProps<T extends keyof AuthScreensParams> = StackScreenProps<AuthScreensParams, T, 'auth'>;

export type AuthScreensParams = {
    Signin: undefined;
    Signup: undefined;
};

const AuthStack = createStackNavigator<AuthScreensParams>();

export function AuthNavigator() {
    return (
        <AuthStack.Navigator id='auth'>
            <AuthStack.Screen options={{ headerShown: false }} name="Signin" component={SigninScreen} />
            <AuthStack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
        </AuthStack.Navigator>
    );
}
