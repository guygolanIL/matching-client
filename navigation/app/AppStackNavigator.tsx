import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Spinner } from "../../components/design-system/Spinner/Spinner";
import { useGetPrivateUserProfileQuery } from "../../data/profile/hooks/useGetPrivateUserProfileQuery";
import { AppTabsNavigator, AppTabsScreensParams } from "./main/AppTabsNavigator";
import { OnboardingStackScreensParams, OnboardingStackNavigator } from "./onboarding/OnboardingStackNavigator";

export type AppStackScreensParams = {
    Main: NavigatorScreenParams<AppTabsScreensParams> | undefined;
    OnboardingWizard: NavigatorScreenParams<OnboardingStackScreensParams> | undefined;
    Loading: undefined;
};

const AppStack = createStackNavigator<AppStackScreensParams>();

export function AppStackNavigator() {
    const { status, isLoading } = useGetOnboardingStatusQuery();

    return (
        <AppStack.Navigator id='app'>
            {isLoading ? (
                <AppStack.Screen options={{ headerShown: false }} name="Loading" component={Spinner} />
            ) : (
                status !== 'COMPLETED' ? (
                    <AppStack.Screen options={{ headerShown: false }} name="OnboardingWizard" component={OnboardingStackNavigator} />
                ) : (
                    <AppStack.Screen options={{ headerShown: false }} name="Main" component={AppTabsNavigator} />
                )
            )}
        </AppStack.Navigator>
    );
}

function useGetOnboardingStatusQuery() {
    const { data: profile, isLoading } = useGetPrivateUserProfileQuery();

    return {
        status: profile?.onboardingStatus,
        isLoading,
    }
}