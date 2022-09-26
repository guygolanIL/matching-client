import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type FormTextFieldProps = {} & TextInputProps;
export function FormTextField(props: FormTextFieldProps) {
    return (
        <TextInput
            {...props}
            style={styles.input}
            selectionColor={'#7aa7c7'}
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