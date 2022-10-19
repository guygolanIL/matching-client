import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, Image, View, useWindowDimensions } from 'react-native';
import ActionSheet, { SheetProps } from "react-native-actions-sheet";

import { useGetPublicUserProfileQuery } from '../../data/profile/hooks/useGetPublicUserProfileQuery';
import { Button } from '../design-system/Button/Button';
import { Spinner } from '../design-system/Spinner/Spinner';
import { createStyles, Theme } from '../design-system/style';
import { useSheetManager } from '../../hooks/useSheetManager';


const useStyles = createStyles(({ theme, props }: { theme: Theme; props?: { height: number } }) => ({
    container: {
        height: props?.height,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headline: { color: theme.palette.primary.main },
    profileImage: {
        width: 300,
        height: 300,
        borderRadius: 300
    }
}));
export function NewMatching(props: SheetProps) {
    const { isLoading, data: publicProfile } = useGetPublicUserProfileQuery(props.payload.matchedUserId);
    const dimensions = useWindowDimensions();
    const navigation = useNavigation();
    const sheets = useSheetManager();
    const styles = useStyles({
        height: dimensions.height * 0.6,
    });

    return (
        <ActionSheet
            id={props.sheetId}
            gestureEnabled
            containerStyle={{
                height: '65%'
            }}
        >
            <View style={styles.container}>
                {isLoading ? (<Spinner />) : (
                    <>
                        <Text style={styles.headline}>Hey! You have got a new match 🎉</Text>
                        <Image
                            style={styles.profileImage}
                            source={{ uri: publicProfile?.profileImage?.url }}
                        />
                        <Button
                            label='Go to chats'
                            onPress={() => {
                                navigation.navigate('App', {
                                    screen: 'Main', params: {
                                        screen: 'Chats', params: {
                                            screen: 'Main'
                                        }
                                    }
                                });
                                sheets.hideAll()
                            }}
                        />
                    </>
                )}
            </View>
        </ActionSheet>
    );
}