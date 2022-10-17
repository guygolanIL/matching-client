import React from "react";
import { ColorValue, View, ViewProps } from "react-native";

import * as Styling from '../style';
import { IconButton } from "../IconButton/IconButton";

type FabProps = ViewProps & {
    icon: React.ReactElement;
    onPress: () => void;
    disabled: boolean;
    color: ColorValue;
    location: {
        horizontal?: 'right' | 'left',
    },
};
const useStyles = Styling.createStyles(({ theme, props }: { theme: Styling.Theme; props?: FabProps }) => {
    function getHorizontal(horizontal?: FabProps['location']['horizontal']): { right?: number | undefined; left?: number | undefined } {
        const defaultHorizontal = { right: 30 };

        if (!horizontal) return defaultHorizontal;
        if (horizontal === 'right') {
            return defaultHorizontal;
        }

        if (horizontal === 'left') {
            return { left: 30 };
        }

        return defaultHorizontal
    }

    function getVertical(): { up?: number | undefined; bottom?: number | undefined } {
        return {
            bottom: 70,
        };
    }

    return {
        button: {
            display: 'flex',
            position: 'absolute',
            ...getHorizontal(props?.location.horizontal),
            ...getVertical(),
            ...theme.shadows,
        }
    };
});
export function Fab(props: FabProps) {
    const styles = useStyles(props);
    return (
        <IconButton
            disabled={props.disabled}
            onPress={props.onPress}
            color={props.color}
            icon={props.icon}
            style={styles.button}
        />
    );
}