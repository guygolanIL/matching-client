import React from "react";
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, TextInputProps } from "react-native";

type FormTextFieldProps = {} & TextInputProps;
export function FormTextField(props: FormTextFieldProps) {
    return (
        <TextInput
            {...props}
            style={styles.input}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        width: '90%',
        marginBottom: 10
    },
});