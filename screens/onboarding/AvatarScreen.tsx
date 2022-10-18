import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Animated } from "react-native";
import Toast from "react-native-root-toast";

import { ImageButton } from "../../components/design-system/ImageButton/ImageButton";
import { useFadeIn } from "../../components/design-system/style/animations/useFadeIn";
import { useUpdateOnboardingStatusMutation } from "../../data/onboarding/hooks/useUpdateOnboardingStatusMutation";
import { useImagePicker } from "../../hooks/useImagePicker";
import { withDefaultProfileImage } from "../../util/image";
import { OnboardingScreenLayout } from "./OnboardingScreenLayout";

export function AvatarScreen() {
    const navigation = useNavigation();
    const { mutate } = useUpdateOnboardingStatusMutation();
    const fadeIn = useFadeIn();
    const imagePicker = useImagePicker({
        onError(e) {
            Toast.show(e);
        },
    });

    const uri = withDefaultProfileImage(imagePicker.imageInfo?.uri);

    return (
        <OnboardingScreenLayout
            onPrevious={() => navigation.navigate('App', {
                screen: 'OnboardingWizard', params: {
                    screen: 'Name'
                }
            })}
            nextDisabled={!Boolean(imagePicker.imageInfo?.uri)}
            onNext={() => {
                if (!imagePicker.imageInfo?.fileExtension || !imagePicker.imageInfo.base64) return;
                mutate({
                    avatar: {
                        type: imagePicker.imageInfo?.fileExtension,
                        base64: imagePicker.imageInfo.base64
                    }
                });
                navigation.navigate('App', {
                    screen: 'OnboardingWizard', params: {
                        screen: 'Loading'
                    }
                });
            }}
        >
            <OnboardingScreenLayout.SectionHeader title="Upload your first Avatar" />

            <Animated.View
                style={{
                    opacity: fadeIn
                }}
            >
                <ImageButton shape='hard' uri={uri} size={'large'} onPress={() => imagePicker.open()} />
            </Animated.View>

        </OnboardingScreenLayout>
    );
}
