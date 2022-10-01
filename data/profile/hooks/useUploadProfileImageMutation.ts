import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../api';

export function useUploadProfileImageMutation() {
    return useMutation(uploadImage);
}