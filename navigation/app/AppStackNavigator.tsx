import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Spinner } from "../../components/design-system/Spinner/Spinner";
import { useGetOnboardingStatusQuery } from "../../data/onboarding/hooks/useGetOnboardingStatusQuery";
import { AppTabsNavigator, AppTabsScreensParams } from "./main/AppTabsNavigator";
import { OnboardingStackScreensParams, OnboardingStackNavigator } from "./onboarding/OnboardingStackNavigator";

export type AppStackScreensParams = {
    Main: NavigatorScreenParams<AppTabsScreensParams> | undefined;
    OnboardingWizard: NavigatorScreenParams<OnboardingStackScreensParams> | undefined;
    Loading: undefined;
};

const AppStack = createStackNavigator<AppStackScreensParams>();

export function AppStackNavigator() {
    const { data, isLoading } = useGetOnboardingStatusQuery();

    return (
        <AppStack.Navigator id='app'>
            {isLoading ? (
                <AppStack.Screen options={{ headerShown: false }} name="Loading" component={Spinner} />
            ) : (
                data?.status !== 'COMPLETED' ? (
                    <AppStack.Screen options={{ headerShown: false }} name="OnboardingWizard" component={OnboardingStackNavigator} />
                ) : (
                    <AppStack.Screen options={{ headerShown: false }} name="Main" component={AppTabsNavigator} />
                )
            )}
        </AppStack.Navigator>
    );
}