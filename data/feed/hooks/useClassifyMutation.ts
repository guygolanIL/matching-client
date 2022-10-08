import { useMutation } from "@tanstack/react-query";

import { classify, ClassifyResponsePayload } from "../api";


type UseClassifyMutationOptions = {
    onSuccess?: (response: ClassifyResponsePayload) => void;
}
export function useClassifyMutation(options?: UseClassifyMutationOptions) {
    return useMutation(classify, {
        onSuccess(data, variables, context) {
            options?.onSuccess?.(data)
        },
    });
}