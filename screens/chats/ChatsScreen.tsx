import { View } from "react-native";
import { Link, useNavigation } from '@react-navigation/native';

import { Error } from "../../components/design-system/Error/Error";
import { Spinner } from "../../components/design-system/Spinner/Spinner";
import { useGetMatchesQuery } from "../../data/chat/hooks/useGetMatchesQuery";
import { useTheme } from "../../components/design-system/style";
import { MatchButton } from "./MatchButton";
import * as Styling from '../../components/design-system/style';
import { withDefaultProfileImage } from "../../util/image";

const useStyles = Styling.createStyles(() => ({
    buttonContainer: {
        marginBottom: 10
    }
}));
export function ChatsScreen() {
    const styles = useStyles();
    const { data: matches, isLoading } = useGetMatchesQuery();
    const theme = useTheme();
    const navigation = useNavigation();

    if (isLoading) return <Spinner />;

    if (matches?.length === 0) return (
        <Error message={
            <Link
                style={{
                    color: theme.palette.primary.main
                }}
                to={{
                    screen: 'App', params: {
                        screen: 'Feed'
                    }
                }}
            >
                No matches yet... :(
            </Link>}
        />
    );


    return (
        <View style={{ padding: 10 }}>
            {matches?.map(({ id, matchedWith }) => {
                const imageUri = withDefaultProfileImage(matchedWith.profileImage?.url);
                return (
                    <View key={id} style={styles.buttonContainer}>
                        <MatchButton
                            label={matchedWith.userId.toString()}
                            imageUri={imageUri}
                            onPress={() => navigation.navigate('App', {
                                screen: 'Chats', params: {
                                    screen: 'Chat', params: {
                                        matchedWith,
                                        matchId: id,
                                        profileImgUri: imageUri,
                                    },
                                }
                            })}
                        />
                    </View>
                );
            })}
        </View>
    );
}