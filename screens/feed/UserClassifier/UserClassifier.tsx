import React from 'react';
import { View, Image } from 'react-native';

import * as Styling from '../../../components/design-system/style';
import { Attitude, PublicProfileInfo } from '../../../data/feed/api';
import { withDefaultProfileImage } from '../../../util/image';
import { ImageStack } from './ImageStack/ImageStack';

const useStyles = Styling.createStyles(() => ({
    classifier: {
        flex: 1
    },
}));
export type Props = {
    users: Array<PublicProfileInfo>;
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
                    uri: withDefaultProfileImage(user.profileImage?.url),
                }))}
                onImageSlided={(id: number, direction: 'right' | 'left') => onClassify(id, direction === 'right' ? 'POSITIVE' : "NEGATIVE")}
            />
        </View>
    );
}
