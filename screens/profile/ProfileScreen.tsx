import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';

import { Error } from '../../components/design-system/Error/Error';
import { Button } from '../../components/design-system/Button/Button';
import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { useUploadProfileImageMutation } from '../../data/profile/hooks/useUploadProfileImageMutation';
import { useUserProfileQuery } from '../../data/profile/hooks/useUserProfileQuery';
import { useImagePicker } from '../../hooks/useImagePicker';
import { ImageButton } from '../../components/design-system/ImageButton/ImageButton';

function getImageUri(profileImageUri: string, pickedImageUri: string | undefined): string {
    if (pickedImageUri) return pickedImageUri

    return profileImageUri;
}

export function ProfileScreen() {
    const { mutate, isLoading } = useUploadProfileImageMutation();
    const imagePicker = useImagePicker({
        onError(e) {
            Toast.show(e);
        },
    });
    const { data: userProfile, isError, isLoading: isUserProfileLoading } = useUserProfileQuery();

    if (isUserProfileLoading) return <Spinner />
    if (isError) return <Error message='Failed to load profile :(' />

    const savedImageUri = userProfile.result.profileImage.url;

    const uri = getImageUri(savedImageUri, imagePicker.imageInfo?.uri);

    return (
        <View style={styles.screen}>
            <View style={styles.imageSection}>
                <ImageButton shape='circle' uri={uri} size={[200, 200]} onPress={() => imagePicker.open()} />
            </View>

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

const styles = StyleSheet.create({
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
});