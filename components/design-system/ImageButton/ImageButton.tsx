import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from 'react-native';

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
    uri?: string;
    defaultUri: string;
    size: Size;
    shape?: Shape;
    onPress?: () => void;
};
export function ImageButton(props: Props) {
    const [width, height] = props.size;
    const styles = useStyles(props);
    const borderRadius: number = getBorderRadius(props.shape);
    console.log(props.uri, props.defaultUri);
    return (
        <TouchableOpacity style={styles.imagebutton} onPress={() => {
            console.log('pre');
            props.onPress?.()
        }}>
            <Image source={{ uri: props.uri || props.defaultUri }} style={{ width, height, borderRadius }} />
        </TouchableOpacity>
    );
}