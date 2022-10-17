import React, { useState } from 'react';
import { View, Text, TextInput as _NativeInput, TextInputProps } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from '../../components/design-system/IconButton/IconButton';
import * as Styling from '../../components/design-system/style';
import { Fab } from '../../components/design-system/Fab/Fab';

export type OnboardingScreenLayoutProps = React.PropsWithChildren<{
    onNext?: () => void;
    onPrevious?: () => void;
    nextDisabled: boolean;
}>;
export function OnboardingScreenLayout(props: OnboardingScreenLayoutProps) {
    const theme = Styling.useTheme();
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.palette.primary.main,
                paddingHorizontal: 10,
                paddingVertical: 20,
            }}
        >
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 20
                }}
            >
                {props.children}
            </View>
            {props.onPrevious && (
                <Fab
                    onPress={props.onPrevious}
                    disabled={false}
                    color={theme.palette.primary.dark}
                    location={{ horizontal: 'left' }}
                    icon={<Icons name="navigate-before" size={40} color="white" />}
                />
            )}
            {props.onNext && (
                <Fab
                    onPress={props.onNext}
                    disabled={props.nextDisabled}
                    color={theme.palette.primary.dark}
                    location={{ horizontal: 'right' }}
                    icon={<Icons name="navigate-next" size={40} color="white" />}
                />
            )}
        </SafeAreaView>
    );
}

const useSectionHeaderStyles = Styling.createStyles(({ theme }) => ({
    text: {
        fontSize: theme.typography.header.fontSize,
        fontWeight: theme.typography.header.fontWeight,
        marginBottom: 30,
        color: 'white',
    },
}));
OnboardingScreenLayout.SectionHeader = function SectionHeader(props: { title: string }) {
    const styles = useSectionHeaderStyles();
    return (
        <Text style={styles.text}>{props.title}</Text>
    );
};

const useSectionTextInputStyles = Styling.createStyles(({ theme }) => ({
    SectionTextInput: {
        backgroundColor: 'white',
        borderRadius: theme.shape.borderRadius.smooth,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        ...theme.shadows,
        elevation: 10
    },
    inpuContainer: {
        flex: 1,
    },
    endAdornment: {

    }
}));
OnboardingScreenLayout.SectionTextInput = function SectionTextInput(props: TextInputProps & {
    onDeleteValue: () => void;
}) {
    const styles = useSectionTextInputStyles();
    const theme = Styling.useTheme();

    return (
        <View
            style={styles.SectionTextInput}
        >
            <View style={styles.inpuContainer}>
                <_NativeInput
                    value={props.value}
                    selectionColor={theme.palette.primary.main}
                    onChange={props.onChange}
                    {...props}
                />
            </View>
            {props.value && (
                <View style={styles.endAdornment}>
                    <IconButton
                        onPress={props.onDeleteValue}
                        style={{
                            padding: 0,
                            backgroundColor: 'transparent'
                        }}
                        icon={<Icons name="cancel" size={28} color={theme.palette.grey.light} />}
                    />
                </View>
            )}
        </View>
    );
};

