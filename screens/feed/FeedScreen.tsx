import { View } from 'react-native';

import { useFeedQuery } from "../../data/feed/hooks/useFeedQuery";
import * as Styling from '../../components/design-system/style';
import { UserClassifier } from './UserClassifier/UserClassifier';
import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { useClassifyMutation } from '../../data/feed/hooks/useClassifyMutation';
import { Error } from '../../components/design-system/Error/Error';

const useStyles = Styling.createStyles(() => ({
    screen: {
        flex: 1,
        padding: 10,
    }
}));

export function FeedScreen() {
    const styles = useStyles();
    const { feed, isFeedLoading } = useFeedQuery();
    const { mutate, data } = useClassifyMutation();

    if (isFeedLoading || !feed) return <Spinner />;

    if (data?.matchedUserId) {
        return <Error message={`you got a match with ${data.matchedUserId}`} />
    }

    return (
        <View style={styles.screen}>
            <UserClassifier users={feed} onClassify={(userId, attitude) => {
                mutate({
                    attitude,
                    classifiedUserId: userId,
                });
            }} />
        </View>
    );
}