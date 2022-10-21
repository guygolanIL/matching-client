import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Error } from "../../components/design-system/Error/Error";

import { Spinner } from "../../components/design-system/Spinner/Spinner";
import { useGetOnboardingStatusQuery } from "../../data/onboarding/hooks/useGetOnboardingStatusQuery";
import { ErrorScreen } from "../../screens/error/ErrorScreen";
import { AppTabsNavigator, AppTabsScreensParams } from "./main/AppTabsNavigator";
import { OnboardingStackScreensParams, OnboardingStackNavigator } from "./onboarding/OnboardingStackNavigator";

export type AppStackScreensParams = {
    Main: NavigatorScreenParams<AppTabsScreensParams> | undefined;
    OnboardingWizard: NavigatorScreenParams<OnboardingStackScreensParams> | undefined;
    Loading: undefined;
    Error: { message?: string };
};

const AppStack = createStackNavigator<AppStackScreensParams>();

export function AppStackNavigator() {
    const { data, isLoading, isError, error } = useGetOnboardingStatusQuery();

    function mapToScreen(): React.ReactElement {

        if (isLoading) return <AppStack.Screen options={{ headerShown: false }} name="Loading" component={Spinner} />;
        if (isError) {
            return <AppStack.Screen options={{ headerShown: false }} initialParams={{ message: error.response?.data.issues[0].message }} name="Error" component={ErrorScreen} />;
        }

        if (data?.status !== 'COMPLETED') {
            return <AppStack.Screen options={{ headerShown: false }} name="OnboardingWizard" component={OnboardingStackNavigator} />;
        }

        return <AppStack.Screen options={{ headerShown: false }} name="Main" component={AppTabsNavigator} />;
    }
    return (
        <AppStack.Navigator id='app'>
            {mapToScreen()}
        </AppStack.Navigator>
    );
}