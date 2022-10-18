import { registerSheet } from "react-native-actions-sheet";

import { ImageSourcePicker } from "./ImageSourcePicker";
import { NewMatching } from "./NewMatching";

export type SheetDefinitions = {
    'new-matching': [
        { matchedUserId: number; },
        undefined
    ],
    'image-source-picker': [
        undefined,
        { type: 'camera' | 'gallery' }
    ],
};
export type SheetPayload<T extends keyof SheetDefinitions> = SheetDefinitions[T][0];
export type SheetReturn<T extends keyof SheetDefinitions> = SheetDefinitions[T][1];


export function registerSheets() {
    registerSheet("new-matching", NewMatching);
    registerSheet("image-source-picker", ImageSourcePicker);
}
