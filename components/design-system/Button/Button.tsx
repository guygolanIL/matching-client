import { TouchableOpacity, Text, ColorValue, ActivityIndicator } from 'react-native';

import * as Styling from '../../design-system/style';

type ButtonProps = {
    onPress: () => void;
    label: string;
    labelColor?: ColorValue;
    startAdornment?: React.ReactElement;
    borderColor?: ColorValue;
    color?: ColorValue;
    loading?: boolean;
    disabled?: boolean;
}

const useStyles = Styling.createStyles(({ theme, props }: { theme: Styling.Theme, props?: ButtonProps }) => ({
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 15,
        borderRadius: theme.shape.borderRadius.smooth,
        borderColor: props?.borderColor || theme.palette.primary.main,
        borderWidth: 1,
        width: '90%',
        backgroundColor: props?.color || theme.palette.primary.main,
        opacity: props?.disabled ? 0.6 : 1,
    } as const,
    buttonText: {
        fontWeight: '500',
        color: props?.labelColor || '#ffffff'
    } as const,
}));

export function Button(props: ButtonProps) {
    const { label, onPress, disabled } = props;
    const styles = useStyles(props);
    return (
        <TouchableOpacity disabled={disabled} style={styles.button} onPress={onPress}>
            {!props.loading && props.startAdornment}
            {!props.loading && <Text style={styles.buttonText}>{label}</Text>}
            {props.loading && <ActivityIndicator color={props.labelColor || 'white'} />}
        </TouchableOpacity>
    );
}