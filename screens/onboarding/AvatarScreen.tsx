import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Animated } from "react-native";
import Toast from "react-native-root-toast";

import { ImageButton } from "../../components/design-system/ImageButton/ImageButton";
import { useFadeIn } from "../../components/design-system/style/animations/useFadeIn";
import { getPrivateProfileQueryKey } from "../../data/profile/hooks/useGetPrivateUserProfileQuery";
import { useUploadProfileImageMutation } from "../../data/profile/hooks/useUploadProfileImageMutation";
import { useImagePicker } from "../../hooks/useImagePicker";
import { withDefaultProfileImage } from "../../util/image";
import { OnboardingScreenLayout } from "./OnboardingScreenLayout";

export function AvatarScreen() {
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const { mutate } = useUploadProfileImageMutation();
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
                    type: imagePicker.imageInfo?.fileExtension,
                    base64: imagePicker.imageInfo.base64
                }, {
                    onSettled(data, error, variables, context) {
                        queryClient.refetchQueries([getPrivateProfileQueryKey]);
                    },
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
