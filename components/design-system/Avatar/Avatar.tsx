import { Image, ImageStyle } from "react-native";
import { useTheme } from "../style";
import { BorderRadius, createStyles } from "../style/theme/theme";

export type Size = 'small' | 'medium' | 'large';

export function getImageSize(size: Size): number | string {
    const sizeMapping: { [key in Size]: number | string } = {
        small: 50,
        medium: 80,
        large: 300
    };

    return sizeMapping[size] || sizeMapping['medium'];
}

export type Props = {
    uri: string;
    size: Size;
    radius?: BorderRadius;
    imageStyle?: ImageStyle;
};

const useStyles = createStyles(() => ({
    image: {
        borderColor: 'black',
        borderWidth: 1,
    }
}));

export function Avatar(props: Props) {
    const styles = useStyles();
    const theme = useTheme();
    const imageSize = getImageSize(props.size);

    return (
        <Image
            source={{ uri: props.uri }}
            style={{
                width: imageSize,
                height: imageSize,
                borderRadius: theme.shape.borderRadius[props.radius || 'smooth'],
                ...styles.image,
                ...props.imageStyle,
            }}
        />
    );
}