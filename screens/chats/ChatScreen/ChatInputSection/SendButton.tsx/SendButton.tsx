import React from "react";
import SendIcon from '@expo/vector-icons/Ionicons';

import { IconButton } from "../../../../../components/design-system/IconButton/IconButton";

export function SendButton(props: { onPress?: () => void }) {

    return (
        <IconButton
            onPress={props.onPress}
            icon={<SendIcon name="send" size={18} color="white" />}
        />
    );
}