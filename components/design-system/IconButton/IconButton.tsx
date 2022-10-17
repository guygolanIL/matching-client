import { TouchableOpacityProps, TouchableOpacity, ViewStyle, ColorValue } from "react-native";

import * as Styling from '../style';

const useStyles = Styling.createStyles(({ theme, props }: { theme: Styling.Theme, props?: Props }) => {
    const overrideStyle: ViewStyle = props?.style || {};

    return {
        button: {
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: props?.disabled
                ? theme.palette.grey.light
                : props?.color
                    ? props.color
                    : theme.palette.primary.main,
            padding: 13,
            borderRadius: theme.shape.borderRadius.max,
            ...overrideStyle,
        },
    };
});

export type Props = TouchableOpacityProps & {
    icon: React.ReactElement;
    color?: ColorValue;
    disabled?: boolean;
    style?: ViewStyle;
}
export function IconButton(props: Props) {
    const styles = useStyles(props);

    const { icon, disabled, onPress } = props;

    return (
        <TouchableOpacity
            onPress={(e) => !disabled && onPress?.(e)}
            style={styles.button}
        >
            {icon}
        </TouchableOpacity>
    );
}