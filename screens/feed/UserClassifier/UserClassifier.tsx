import { useState } from 'react';
import { View, Image } from 'react-native';

import { Button } from '../../../components/design-system/Button/Button';
import { Error } from '../../../components/design-system/Error/Error';
import * as Styling from '../../../components/design-system/style';

type Subject = {
    profileImgUri: string;
    userId: number;
}
type Attitude = "POSITIVE" | 'NEGATIVE';

const useStyles = Styling.createStyles(() => ({
    classifier: {
        flex: 1
    },
    imageSection: {

    }
}));
export type Props = {
    users: Array<Subject>;
    onClassify: (user: Subject, attitude: Attitude) => void;
};
export function UserClassifier(props: Props) {
    const { onClassify, users } = props;
    const styles = useStyles();
    const [displayedUser, setDisplayedUser] = useState<Subject>(users[0]);

    if (users.length === 0) {
        return <Error message='Users not found :(' />
    }

    return (
        <View style={styles.classifier}>
            <View style={styles.imageSection}>
                <Image source={{ uri: displayedUser.profileImgUri }} />
            </View>
            <ButtonSection onClassify={(attitude) => onClassify(displayedUser, attitude)} />
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
}));
function ButtonSection({ onClassify }: { onClassify: (attitude: Attitude) => void }) {
    const styles = useButtonSectionStyles();
    return (
        <View style={styles.buttonSection}>
            <View style={styles.buttonContainer}>
                <Button label='Dislike' onPress={() => onClassify('NEGATIVE')} />
            </View>
            <View style={styles.buttonContainer}>
                <Button label='Like' onPress={() => onClassify('POSITIVE')} />
            </View>
        </View>
    );
}
