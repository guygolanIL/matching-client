import React from 'react';
import { Text, TextProps } from '../Themed';

export function ClickableText(props: TextProps) {
    return (
        <Text
            {...props}
            style={{ color: '#7aa7c7' }}
        >
            {props.children}
        </Text>
    );
}