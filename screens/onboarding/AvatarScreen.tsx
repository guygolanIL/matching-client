import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Animated } from "react-native";
import Toast from "react-native-root-toast";

import { ImageButton } from "../../components/design-system/ImageButton/ImageButton";
import { useFadeIn } from "../../components/design-system/style/animations/useFadeIn";
import { useSheetManager } from "../../hooks/useSheetManager";
import { useUpdateOnboardingStatusMutation } from "../../data/onboarding/hooks/useUpdateOnboardingStatusMutation";
import { useImagePicker } from "../../hooks/useImagePicker";
import { withDefaultProfileImage } from "../../util/image";
import { OnboardingScreenLayout } from "./OnboardingScreenLayout";

export function AvatarScreen() {
    const navigation = useNavigation();
    const { mutate } = useUpdateOnboardingStatusMutation();
    const fadeIn = useFadeIn();
    const sheets = useSheetManager();
    const imagePicker = useImagePicker({
        onError(e) {
            Toast.show(e);
        },
    });

    const uri = withDefaultProfileImage(imagePicker.imageInfo?.uri);

    return (
        <OnboardingScreenLayout
            progress={1 / 2}
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
                        screen: 'OnboardingLoading'
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
                <ImageButton
                    shape='hard'
                    uri={uri}
                    size={'large'}
                    onPress={async () => {
                        const result = await sheets.show('image-source-picker', undefined);
                        if (result?.type === 'camera') {
                            imagePicker.pickFromCamera();
                        }
                        if (result?.type === 'gallery') {
                            imagePicker.pickFromGallery();
                        }
                    }}
                />
            </Animated.View>

        </OnboardingScreenLayout>
    );
}
