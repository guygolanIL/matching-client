import { StyleSheet } from 'react-native';

export const theme = {
    palette: {
        primary: {
            main: '#7aa7c7'
        },
        success: {
            main: '#2e7d32'
        },
        error: {
            main: '#d32f2f'
        }
    },
    shape: {
        borderRadius: {
            max: 10000,
            hard: 50,
            smooth: 10
        },
    }
} as const

export type Theme = typeof theme;

export type BorderRadius = keyof (typeof theme)['shape']['borderRadius'];

export function useTheme(): Theme {
    return theme;
}


type CreatorOptions<P> = {
    theme: Theme;
    props?: P
};
export function createStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>, P>(
    creator: (options: CreatorOptions<P>) => (T | StyleSheet.NamedStyles<T>)
) {

    return function useStyles(props?: P): T {
        const theme = useTheme();
        return StyleSheet.create(creator({ theme, props }));
    }
}