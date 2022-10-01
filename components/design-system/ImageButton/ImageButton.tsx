import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Image } from 'react-native';

function getBorderRadius(shape?: Shape): number {

    const shapeToBorderRadius: { [key in Shape]: number } = {
        circle: 100,
        smooth: 30
    }

    if (!shape) return 10;

    return shapeToBorderRadius[shape];

}

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
    const styles = createStyles(props);
    const borderRadius: number = getBorderRadius(props.shape);

    return (
        <TouchableOpacity style={styles.imagebutton} onPress={props.onPress}>
            <Image source={{ uri: props.uri }} style={{ width, height, borderRadius }} />
        </TouchableOpacity>
    );
}

function createStyles(props: Props) {
    const [width, height] = props.size;
    return StyleSheet.create({
        imagebutton: {
            width,
            height,
        },
    });
} 