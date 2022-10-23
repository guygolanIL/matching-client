import { SheetManager, SheetManager as _SheetManager } from 'react-native-actions-sheet';

import { SheetDefinitions, SheetPayload, SheetReturn } from '../components/sheets/register';

export function useSheetManager() {
    return {
        show<Sheet extends keyof SheetDefinitions>(sheetId: Sheet, payload: SheetPayload<Sheet>): Promise<SheetReturn<Sheet> | undefined> {
            return SheetManager.show<SheetPayload<Sheet>, SheetReturn<Sheet>>(sheetId, {
                payload
            });
        },
        hide<Sheet extends keyof SheetDefinitions>(sheetId: Sheet, payload: SheetReturn<Sheet>): Promise<SheetReturn<Sheet> | undefined> {
            return SheetManager.hide<SheetReturn<Sheet>>(sheetId, {
                payload
            });
        },
        hideAll() {
            SheetManager.hideAll();
        }
    }
}