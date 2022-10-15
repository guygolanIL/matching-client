import React, { LegacyRef } from "react";
import { TextInput, TextInputProps } from "react-native";

import * as Styling from '../style';

const useStyles = Styling.createStyles(() => ({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        width: '90%',
        marginBottom: 10
    },
}));
type FormTextFieldProps = {} & TextInputProps;
export const FormTextField = React.forwardRef((props: FormTextFieldProps, ref: LegacyRef<TextInput>) => {
    const styles = useStyles();
    const theme = Styling.useTheme();
    return (
        <TextInput
            ref={ref}
            {...props}
            style={styles.input}
            selectionColor={theme.palette.primary.main}
        />
    );
});