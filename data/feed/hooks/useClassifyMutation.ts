import { useMutation } from "@tanstack/react-query";

import { classify } from "../api";

export function useClassifyMutation() {
    return useMutation(classify);
}