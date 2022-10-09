import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Avatar, getImageSize, Size } from '../Avatar/Avatar';

import * as Styling from '../style';
import { BorderRadius } from '../style/theme/theme';

const useStyles = Styling.createStyles(({ props }: { props?: Props }) => {
    const sizeNumber = getImageSize(props?.size || 'large');
    return ({
        imagebutton: {
            width: sizeNumber,
            height: sizeNumber,
        },
    });
});
export type Props = {
    uri: string;
    size: Size;
    shape?: BorderRadius;
    onPress?: () => void;
};
export function ImageButton(props: Props) {
    const styles = useStyles(props);

    return (
        <TouchableOpacity style={styles.imagebutton} onPress={props.onPress}>
            <Avatar uri={props.uri} radius={props.shape} size={props.size} />
        </TouchableOpacity>
    );
}