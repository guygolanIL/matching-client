import { registerSheet, SheetManager as _SheetManager } from 'react-native-actions-sheet';

import { NewMatching } from "./NewMatching";

registerSheet("new-matching", NewMatching);

export type SheetsIds = 'new-matching'