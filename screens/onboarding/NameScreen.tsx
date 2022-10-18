import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { useUpdateOnboardingStatusMutation } from '../../data/onboarding/hooks/useUpdateOnboardingStatusMutation';
import { UpdatePrivateUserProfileRequestBody } from '../../data/profile/api';
import { useGetPrivateUserProfileQuery } from '../../data/profile/hooks/useGetPrivateUserProfileQuery';
import { useFormValues } from '../../hooks/useFormValues';
import { OnboardingScreenLayout } from "./OnboardingScreenLayout";


export function NameScreen() {
    const { data, isLoading } = useGetPrivateUserProfileQuery();
    const { mutate } = useUpdateOnboardingStatusMutation();
    const navigation = useNavigation();
    const formValues = useFormValues<UpdatePrivateUserProfileRequestBody>({
        name: data?.name || ''
    });

    if (isLoading) return <Spinner />;

    const isNextDisabled = formValues.values.name === ''

    return (
        <OnboardingScreenLayout
            nextDisabled={isNextDisabled}
            onNext={() => {
                mutate({
                    step1: {
                        name: formValues.values.name
                    }
                });
                navigation.navigate('App', {
                    screen: 'OnboardingWizard', params: {
                        screen: 'Avatar'
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