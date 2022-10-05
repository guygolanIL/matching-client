import { Image } from 'react-native';

import * as Styling from '../../../../components/design-system/style';
import { Theme } from '../../../../components/design-system/style';
type Props = {
    uri: string
}
const useStyles = Styling.createStyles(({ theme }) => ({
    imageStack: {
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        height: '100%',
    },
}));
export function ImageStack(props: Props) {
    const { uri } = props;
    const styles = useStyles();
    return (
        <Image style={styles.imageStack} source={{ uri }} />
    );
}
