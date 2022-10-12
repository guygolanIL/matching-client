import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const theme = {
    palette: {
        primary: {
            main: '#7aa7c7',
            light: '#bdd3e3',

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
    },
    shadows: {
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
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

        const styles = useMemo(() => (
            StyleSheet.create(creator({ theme, props }))
        ), [theme, props]);

        return styles;
    }
}