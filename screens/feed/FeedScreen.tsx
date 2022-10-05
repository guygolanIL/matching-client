import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFeedQuery } from "../../data/feed/hooks/useFeedQuery";
import { Button } from "../../components/design-system/Button/Button";
import { useAuth } from "../../contexts/auth";
import * as Styling from '../../components/design-system/style';
import { UserClassifier } from './UserClassifier/UserClassifier';
import { Error } from '../../components/design-system/Error/Error';
import { Spinner } from '../../components/design-system/Spinner/Spinner';

const useStyles = Styling.createStyles(() => ({
    screen: {
        flex: 1,
        paddingVertical: 10,
    }
}));

export function FeedScreen() {
    const styles = useStyles();

    const auth = useAuth();
    const navigation = useNavigation();
    const { feed, isFeedLoading } = useFeedQuery();

    if (isFeedLoading) return <Spinner />

    if (feed?.length === 0) {
        return <Error message='Come back tommorrow...' />
    }

    return (
        <View style={styles.screen}>
            <UserClassifier users={feed || []} onClassify={(user, attitude) => console.log(user, attitude)} />
        </View>
    );
}