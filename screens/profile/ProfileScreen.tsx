import { View, Image, Animated } from 'react-native';
import Toast from 'react-native-root-toast';

import { Error } from '../../components/design-system/Error/Error';
import { Button } from '../../components/design-system/Button/Button';
import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { useUploadProfileImageMutation } from '../../data/profile/hooks/useUploadProfileImageMutation';
import { useGetPrivateUserProfileQuery } from '../../data/profile/hooks/useGetPrivateUserProfileQuery';
import { useImagePicker } from '../../hooks/useImagePicker';
import { ImageButton } from '../../components/design-system/ImageButton/ImageButton';
import * as Styling from '../../components/design-system/style';
import { useFadeIn } from '../../components/design-system/style/animations/useFadeIn';
import { withDefaultProfileImage } from '../../util/image';

const useStyles = Styling.createStyles(() => ({
    screen: {
        flex: 1,
        paddingVertical: 10,
    },
    imageSection: {
        alignItems: 'center'
    },
    confirmSection: {
        alignItems: 'center',
        marginTop: 'auto'
    }
}));

function getImageUri(profileImageUri: string | undefined, pickedImageUri: string | undefined): string | undefined {
    if (pickedImageUri) return pickedImageUri

    return profileImageUri;
}

export function ProfileScreen() {
    const styles = useStyles();
    const { mutate, isLoading } = useUploadProfileImageMutation();
    const fadeIn = useFadeIn();
    const imagePicker = useImagePicker({
        onError(e) {
            Toast.show(e);
        },
    });
    const { data: userProfile, isError, isLoading: isUserProfileLoading } = useGetPrivateUserProfileQuery();

    if (isUserProfileLoading) return <Spinner />;
    if (isError) return <Error message='Failed to load profile :(' />;

    const savedImageUri = userProfile.profileImage?.url;

    const uri = withDefaultProfileImage(getImageUri(savedImageUri, imagePicker.imageInfo?.uri));

    return (
        <View style={styles.screen}>
            <Animated.View
                style={{
                    ...styles.imageSection,
                    opacity: fadeIn
                }}
            >
                <ImageButton shape='max' uri={uri} size={'large'} onPress={() => imagePicker.open()} />
            </Animated.View>

            <View style={styles.confirmSection}>
                <Button label={isLoading ? "Loading..." : "Confirm"} onPress={() => {
                    if (!imagePicker.imageInfo?.fileExtension || !imagePicker.imageInfo.base64) return;

                    mutate({
                        type: imagePicker.imageInfo?.fileExtension,
                        base64: imagePicker.imageInfo.base64
                    });
                }} />
            </View>
        </View>
    );
}