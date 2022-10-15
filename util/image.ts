import { Image } from 'react-native';
import defaultAvatar from '../assets/images/icon.png';
const defaultAvatarUri = Image.resolveAssetSource(defaultAvatar).uri

export function withDefaultProfileImage(uri: string | undefined): string {
    return uri || defaultAvatarUri;
}