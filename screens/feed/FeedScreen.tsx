import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFeedQuery } from "../../data/feed/hooks/useFeedQuery";
import { Button } from "../../components/design-system/Button/Button";
import { useAuth } from "../../contexts/auth";

export function FeedScreen() {
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

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})