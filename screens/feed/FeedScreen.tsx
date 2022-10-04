import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFeedQuery } from "../../data/feed/hooks/useFeedQuery";
import { Button } from "../../components/design-system/Button/Button";
import { useAuth } from "../../contexts/auth";
import * as Styling from '../../components/design-system/style';

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
    return (
        <View style={styles.screen}>
            {isFeedLoading && <Text>Loading...</Text>}
            {
                !isFeedLoading &&
                feed?.result
                    .map(user =>
                    (<Text key={user.id}>
                        {`id: ${user.id}, email ${user.email}, distance ${user.distance}`}
                    </Text>))}
            <Button label="Sign out" onPress={() => auth.signOut.mutate(() => navigation.navigate('Auth'))} />
        </View>
    );
}