import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
    onPress: () => void;
    label: string;
    color?: string
}
export function Button(props: ButtonProps) {
    const { label, onPress } = props;
    const styles = createStyles(props);
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
}

const createStyles = (props: ButtonProps) => StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        borderColor: '#000000',
        width: '90%',
        backgroundColor: props.color || '#7aa7c7'
    } as const,
    buttonText: {
        fontWeight: '500',
        color: '#ffffff'
    } as const
});