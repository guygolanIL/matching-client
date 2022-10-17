import { TouchableOpacity, Text } from 'react-native';

import * as Styling from '../../design-system/style';

type ButtonProps = {
    onPress: () => void;
    label: string;
    color?: string;
    loading?: boolean;
    disabled?: boolean;
}

const useStyles = Styling.createStyles(({ theme, props }: { theme: Styling.Theme, props?: ButtonProps }) => ({
    button: {
        alignItems: 'center',
        padding: 15,
        borderRadius: theme.shape.borderRadius.smooth,
        borderColor: '#000000',
        width: '90%',
        backgroundColor: props?.color || theme.palette.primary.main,
        opacity: props?.disabled ? 0.6 : 1,
    } as const,
    buttonText: {
        fontWeight: '500',
        color: '#ffffff'
    } as const,
}));

export function Button(props: ButtonProps) {
    const { label, onPress, disabled } = props;
    const styles = useStyles(props);
    return (
        <TouchableOpacity disabled={disabled} style={styles.button} onPress={onPress}>
            {!props.loading && <Text style={styles.buttonText}>{label}</Text>}
            {props.loading && <Text style={styles.buttonText}>Loading...</Text>}
        </TouchableOpacity>
    );
}