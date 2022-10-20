import { createStackNavigator } from "@react-navigation/stack";
import { Spinner } from "../../../components/design-system/Spinner/Spinner";

import { AvatarScreen } from "../../../screens/onboarding/AvatarScreen";
import { NameScreen } from "../../../screens/onboarding/NameScreen";

export type OnboardingStackScreensParams = {
    Name: undefined;
    Avatar: undefined;
    OnboardingLoading: undefined;
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

            <OnboardingStack.Screen
                name="OnboardingLoading"
                component={Spinner}
            />
        </OnboardingStack.Navigator>
    );
}