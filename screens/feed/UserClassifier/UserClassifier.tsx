import React, { useState } from 'react';
import { View, Image } from 'react-native';

import { Button } from '../../../components/design-system/Button/Button';
import { Error } from '../../../components/design-system/Error/Error';
import * as Styling from '../../../components/design-system/style';
import { Attitude } from '../../../data/feed/api';
import { useClassifyMutation } from '../../../data/feed/hooks/useClassifyMutation';
import { ImageStack } from './ImageStack/ImageStack';

import defaultAvatar from '../../../assets/images/favicon.png';
const defaultAvatarUri = Image.resolveAssetSource(defaultAvatar).uri


type Subject = {
    profileImgUri: string;
    userId: number;
}
const useStyles = Styling.createStyles(() => ({
    classifier: {
        flex: 1
    },
    imageSection: {
        height: '90%',
        width: '100%'
    }
}));
export type Props = {
    users: Array<Subject>;
    onClassify: (user: Subject, attitude: Attitude) => void;
};
export function UserClassifier(props: Props) {
    const styles = useStyles();

    const { users, onClassify } = props;

    if (users.length === 0) {
        return <Error message='Come back tommorrow...' />
    }

    const displayedUser = users[0];

    return (
        <View style={styles.classifier}>
            <View style={styles.imageSection}>
                <ImageStack uri={displayedUser.profileImgUri || defaultAvatarUri} />
            </View>
            <ButtonSection onClassify={async (attitude) => onClassify(displayedUser, attitude)} />
        </View>
    );
}

const useButtonSectionStyles = Styling.createStyles(() => ({
    buttonSection: {
        marginTop: 'auto',
        flexDirection: 'row',
    },
    buttonContainer: {
        width: '50%',
        alignItems: 'center'
    },
    right: {
        alignItems: 'flex-end'
    },
    left: {
        alignItems: 'flex-start'
    }
}));
function ButtonSection({ onClassify }: { onClassify: (attitude: Attitude) => void }) {
    const styles = useButtonSectionStyles();
    return (
        <View style={styles.buttonSection}>
            <View style={{ ...styles.buttonContainer, ...styles.left }}>
                <Button label='Dislike' onPress={() => onClassify('NEGATIVE')} />
            </View>
            <View style={{ ...styles.buttonContainer, ...styles.right }}>
                <Button label='Like' onPress={() => onClassify('POSITIVE')} />
            </View>
        </View>
    );
}
