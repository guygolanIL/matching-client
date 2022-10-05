import { View } from 'react-native';

import { useFeedQuery } from "../../data/feed/hooks/useFeedQuery";
import * as Styling from '../../components/design-system/style';
import { UserClassifier } from './UserClassifier/UserClassifier';
import { Spinner } from '../../components/design-system/Spinner/Spinner';

const useStyles = Styling.createStyles(() => ({
    screen: {
        flex: 1,
        padding: 10,
    }
}));

export function FeedScreen() {
    const styles = useStyles();
    const { feed, isFeedLoading } = useFeedQuery();

    if (isFeedLoading) return <Spinner />

    return (
        <View style={styles.screen}>
            <UserClassifier users={feed || []} />
        </View>
    );
}