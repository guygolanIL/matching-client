import React, { useState } from 'react';
import { Text, TextProps } from '../Themed';

export function ClickableText(props: TextProps) {
    const [pressed, setPressed] = useState(false);
    return (
        <Text
            {...props}
            style={{ opacity: pressed ? 0.5 : 1, color: '#7aa7c7' }}
            onPressIn={(e) => {
                setPressed(true);
                props.onPress?.(e);
            }}
            onPressOut={() => setPressed(false)}
        >
            {props.children}
        </Text>
    );
}