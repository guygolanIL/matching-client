import { StyleSheet } from 'react-native';
export const theme = {
    palette: {
        primary: {
            main: '#7aa7c7'
        },
    }
} as const

export type Theme = typeof theme;

export function useTheme(): Theme {
    return theme;
}

type Styles = StyleSheet.NamedStyles<any>;

type StyleCreatorOptions<Props> = { theme: Theme, props?: Props };
type StyleCreator<Props> = (opt: StyleCreatorOptions<Props>) => Styles;
export function createStyles<Props = void>(styleCreator: StyleCreator<Props>): (props: Props) => Styles {

    const useStyles = (props: Props): Styles => {
        const theme = useTheme();
        return StyleSheet.create(styleCreator({ theme, props }));
    }

    return useStyles;
}