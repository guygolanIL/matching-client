import { View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

import { useFeedQuery } from "../../data/feed/hooks/useFeedQuery";
import * as Styling from '../../components/design-system/style';
import { UserClassifier } from './UserClassifier/UserClassifier';
import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { useClassifyMutation } from '../../data/feed/hooks/useClassifyMutation';
import { NewMatchingSheetPayload } from '../../components/sheets/NewMatching';

const useStyles = Styling.createStyles(() => ({
    screen: {
        flex: 1,
        padding: 10,
    }
}));

export function FeedScreen() {
    const styles = useStyles();
    const { feed, isFeedLoading } = useFeedQuery();
    const { mutate } = useClassifyMutation({
        onSuccess({ matchedUserId }) {
            if (matchedUserId) {
                SheetManager.show<NewMatchingSheetPayload, any>('new-matching', {
                    payload: {
                        matchedUserId
                    }
                });
            }
        },
    });

    if (isFeedLoading || !feed) return <Spinner />;

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