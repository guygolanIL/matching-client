import React from 'react';
import { Text, View, Pressable } from 'react-native';
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { createStyles, useTheme } from '../design-system/style';
import { useSheetManager } from '../../hooks/useSheetManager';

const useStyles = createStyles(({ theme }) => ({
    buttonsContainer: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: theme.shape.borderRadius.smooth,
        overflow: 'hidden',
    },
}))
export function ImageSourcePicker(props: SheetProps) {
    const styles = useStyles();
    const sheets = useSheetManager();
    return (
        <ActionSheet
            id={props.sheetId}
            containerStyle={{
                backgroundColor: 'transparent',
                elevation: 0,
                height: '14%'
            }}
        >
            <View style={styles.buttonsContainer}>
                <ImageSourceButton
                    onPress={() => sheets.hide('image-source-picker', {
                        type: 'camera'
                    })}
                    text='Camera'
                    icon={<EvilIcons name="camera" size={30} color="black" />}
                />
                <ImageSourceButton
                    onPress={() => sheets.hide('image-source-picker', {
                        type: 'gallery'
                    })}
                    text='Gallery'
                    icon={<MaterialIcons name="insert-photo" size={30} color="black" />}
                />
            </View>
        </ActionSheet>
    );
}

const useSourceButtonStyles = createStyles(({ theme }) => ({
    SourceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius.smooth,
    },
    iconContainer: {
        padding: 10
    },
}));
function ImageSourceButton(props: { text: string; icon: React.ReactElement; onPress: () => void; }) {
    const styles = useSourceButtonStyles();
    const theme = useTheme();

    return (
        <Pressable onPress={props.onPress} android_ripple={{ color: theme.palette.primary.light }} style={[styles.SourceButton]}>
            <View style={styles.iconContainer}>{props.icon}</View>
            <Text>{props.text}</Text>
        </Pressable>
    );
}