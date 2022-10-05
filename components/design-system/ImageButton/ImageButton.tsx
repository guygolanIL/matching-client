import { Image, TouchableOpacity } from 'react-native';

import * as Styling from '../style';

function getBorderRadius(shape?: Shape): number {
    const shapeToBorderRadius: { [key in Shape]: number } = {
        circle: 100,
        smooth: 30
    }

    if (!shape) return 10;

    return shapeToBorderRadius[shape];
}

const useStyles = Styling.createStyles(({ props }: { props?: Props }) => {
    const [width, height] = props?.size || [20, 20];
    return ({
        imagebutton: {
            width,
            height,
        },
    });
});
type Shape = 'circle' | 'smooth';
type Size = [number, number];
export type Props = {
    uri: string;
    size: Size;
    shape?: Shape;
    onPress?: () => void;
};
export function ImageButton(props: Props) {
    const [width, height] = props.size;
    const styles = useStyles(props);
    const borderRadius: number = getBorderRadius(props.shape);

    return (
        <TouchableOpacity style={styles.imagebutton} onPress={props.onPress}>
            <Image source={{ uri: props.uri }} style={{ width, height, borderRadius }} />
        </TouchableOpacity>
    );
}