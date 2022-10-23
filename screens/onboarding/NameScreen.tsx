
import { useNavigation } from '@react-navigation/native';
import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { useUpdateOnboardingStatusMutation } from '../../data/onboarding/hooks/useUpdateOnboardingStatusMutation';
import { UpdatePrivateUserProfileRequestBody } from '../../data/profile/api';
import { useGetPrivateUserProfileQuery } from '../../data/profile/hooks/useGetPrivateUserProfileQuery';
import { useFormValues } from '../../hooks/useFormValues';
import { OnboardingScreenProps } from '../../navigation/app/onboarding/OnboardingStackNavigator';
import { OnboardingScreenLayout } from "./OnboardingScreenLayout";


export function NameScreen(props: OnboardingScreenProps<'Name'>) {
    const { data, isLoading } = useGetPrivateUserProfileQuery();
    const navigation = useNavigation();
    const { mutate } = useUpdateOnboardingStatusMutation();
    const formValues = useFormValues<UpdatePrivateUserProfileRequestBody>({
        name: data?.name || ''
    });

    if (isLoading) return <Spinner />;

    const isNextDisabled = formValues.values.name === ''

    return (
        <OnboardingScreenLayout
            progress={0 / 2}
            nextDisabled={isNextDisabled}
            onNext={() => {
                mutate({
                    step1: {
                        name: formValues.values.name
                    }
                });
                navigation.navigate('App', {
                    screen: 'OnboardingWizard', params: {
                        screen: 'Avatar',
                    }
                });
            }}
        >
            <OnboardingScreenLayout.SectionHeader title="What's your name?" />

            <OnboardingScreenLayout.SectionTextInput
                value={formValues.values.name}
                placeholder='Name'
                onDeleteValue={() => formValues.change('name', '')}
                onChange={(e) => formValues.change('name', e.nativeEvent.text)}
            />
        </OnboardingScreenLayout>
    );
}