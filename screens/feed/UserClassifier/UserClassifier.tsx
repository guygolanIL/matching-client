import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import * as Styling from '../../../components/design-system/style';
import { Attitude } from '../../../data/feed/api';
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
}));
export type Props = {
    users: Array<Subject>;
    onClassify: (userId: number, attitude: Attitude) => void;
};

export function UserClassifier(props: Props) {
    const styles = useStyles();
    const { onClassify, users } = props;

    return (
        <View style={styles.classifier}>
            <ImageStack
                stack={users.map(user => ({
                    id: user.userId,
                    uri: user.profileImgUri || defaultAvatarUri
                }))}
                onImageSlided={(id: number, direction: 'right' | 'left') => onClassify(id, direction === 'right' ? 'POSITIVE' : "NEGATIVE")}
            />
        </View>
    );
}
