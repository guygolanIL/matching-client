import { useState } from "react"
import * as ImagePicker from 'expo-image-picker';

import { ImageType, supportedImageTypes } from "../data/profile/api";

function getFileExtension(uri: string) {
    return uri.slice(uri.lastIndexOf('.') + 1);
}

function validateFileExtension(uri: string): { error?: string } {
    const fileExtension = getFileExtension(uri);
    const supportedExtension = (supportedImageTypes as readonly string[]).includes(fileExtension);
    if (!supportedExtension) return ({ error: `${fileExtension} is not supported` });

    return {};
}

export type UseImagePickerOptions = {
    onError?: (e: string) => void;
};
export function useImagePicker(options?: UseImagePickerOptions) {
    const [imageInfo, setImageInfo] = useState<ImagePicker.ImageInfo & { fileExtension: ImageType }>();

    const imageOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [3, 3] as [number, number],
        quality: 1,
        base64: true,
        allowsEditing: true
    };

    function handlePicked(res: ImagePicker.ImagePickerResult) {

        if (res.cancelled) return;

        const { error } = validateFileExtension(res.uri);
        if (error) {
            options?.onError?.(error);
            return;
        };
        setImageInfo({
            ...res,
            fileExtension: getFileExtension(res.uri) as ImageType
        });
    }

    return {
        async pickFromGallery() {
            const res = await ImagePicker.launchImageLibraryAsync(imageOptions);
            handlePicked(res);
        },
        async pickFromCamera() {
            const res = await ImagePicker.requestCameraPermissionsAsync();
            if (res.status === ImagePicker.PermissionStatus.GRANTED) {
                const res = await ImagePicker.launchCameraAsync(imageOptions);
                handlePicked(res);
            }
        },
        imageInfo,
    };
}