import { TouchableOpacity, Image, Text, useWindowDimensions } from 'react-native';

import * as Styling from '../../components/design-system/style';
type Props = {
    profileImageUri: string;
    email: string;
    onPress: () => void;
}
const useStyles = Styling.createStyles(({ theme }) => ({
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius.smooth,
        backgroundColor: 'white'
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginRight: 10,
        borderColor: 'black',
        borderWidth: 1,
    }
}));
export function MatchButton(props: Props) {
    const styles = useStyles();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPress}
        >
            <Image
                style={styles.image}
                source={{ uri: props.profileImageUri }}
            />
            <Text>{props.email}</Text>
        </TouchableOpacity>
    );
}