import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { UpdatePrivateUserProfileRequestBody } from '../../data/profile/api';
import { useGetPrivateUserProfileQuery } from '../../data/profile/hooks/useGetPrivateUserProfileQuery';
import { useUpdateUserProfileMutation } from "../../data/profile/hooks/useUpdateUserProfileMutation";
import { useFormValues } from '../../hooks/useFormValues';
import { OnboardingScreenLayout } from "./OnboardingScreenLayout";


export function NameScreen() {
    const { mutate } = useUpdateUserProfileMutation();
    const { data, isLoading } = useGetPrivateUserProfileQuery();
    const navigation = useNavigation();

    if (isLoading) return <Spinner />;

    const formValues = useFormValues<UpdatePrivateUserProfileRequestBody>({
        name: data?.name || ''
    });

    const isNextDisabled = formValues.values.name === ''

    return (
        <OnboardingScreenLayout
            nextDisabled={isNextDisabled}
            onNext={() => {
                mutate(formValues.values);
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