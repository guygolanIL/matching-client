import { createStackNavigator } from "@react-navigation/stack";

import { AvatarScreen } from "../../../screens/onboarding/AvatarScreen";
import { NameScreen } from "../../../screens/onboarding/NameScreen";

export type OnboardingStackScreensParams = {
    Name: undefined;
    Avatar: undefined;
};

const OnboardingStack = createStackNavigator<OnboardingStackScreensParams>();

export function OnboardingStackNavigator() {
    return (
        <OnboardingStack.Navigator
            id='onboarding'
            initialRouteName="Name"
            screenOptions={{
                headerShown: false,
            }}
        >
            <OnboardingStack.Screen
                name="Name"
                component={NameScreen}
            />

            <OnboardingStack.Screen
                name="Avatar"
                component={AvatarScreen}
            />
        </OnboardingStack.Navigator>
    );
}