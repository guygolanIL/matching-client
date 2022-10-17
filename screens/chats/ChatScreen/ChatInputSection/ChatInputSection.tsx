import React, { useState } from 'react';
import { TextInput, View, useWindowDimensions } from 'react-native';

import * as Styling from '../../../../components/design-system/style';
import { SendButton } from './SendButton.tsx/SendButton';

const useStyles = Styling.createStyles(({ theme, props }: { theme: Styling.Theme; props?: { screenWidth: number, screenHeight: number } }) => ({
    inputSection: {
        marginBottom: 5,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    inputGroup: {
        height: '100%',
        borderRadius: theme.shape.borderRadius.hard,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    textInput: {
        width: '100%',
    },
    sendButtonContainer: {
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
}));
type Props = {
    onSendMessage: (content: string) => void;
}
export function ChatInputSection(props: Props) {
    const dimensions = useWindowDimensions();
    const styles = useStyles({ screenWidth: dimensions.width, screenHeight: dimensions.height });
    const theme = Styling.useTheme();

    const [inputValue, setInputValue] = useState<string>();

    return (
        <View style={styles.inputSection}>
            <View style={styles.inputGroup}>
                <TextInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.nativeEvent.text)}
                    style={styles.textInput}
                    selectionColor={theme.palette.primary.main}
                    placeholder={"Dont be shy :)"}
                />
            </View>
            <View style={styles.sendButtonContainer}>
                <SendButton
                    onPress={() => {
                        if (!inputValue) return;
                        props.onSendMessage(inputValue);
                        setInputValue(undefined);
                    }}
                />
            </View>
        </View>
    );
}
