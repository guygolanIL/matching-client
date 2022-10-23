import { View } from 'react-native';

import { useFeedQuery } from "../../data/feed/hooks/useFeedQuery";
import * as Styling from '../../components/design-system/style';
import { UserClassifier } from './UserClassifier/UserClassifier';
import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { useClassifyMutation } from '../../data/feed/hooks/useClassifyMutation';
import { useQueryClient } from '@tanstack/react-query';
import { getMatchesQueryKey } from '../../data/chat/hooks/useGetMatchesQuery';
import { useSheetManager } from '../../hooks/useSheetManager';

const useStyles = Styling.createStyles(() => ({
    screen: {
        flex: 1,
        padding: 10,
    }
}));

export function FeedScreen() {
    const styles = useStyles();
    const { feed, isFeedLoading } = useFeedQuery();
    const sheets = useSheetManager();
    const queryClient = useQueryClient();
    const { mutate } = useClassifyMutation({
        onSuccess({ matchedUserId }) {
            if (matchedUserId) {
                queryClient.refetchQueries([getMatchesQueryKey]);
                sheets.show('new-matching', { matchedUserId });
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