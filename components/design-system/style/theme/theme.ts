import { useMemo } from 'react';
import { StyleSheet, TextStyle } from 'react-native';

const theme = {
    palette: {
        primary: {
            main: '#aacf80',
            light: '#ddeccc',
            dark: '#77915a',

        },
        success: {
            main: '#2e7d32'
        },
        error: {
            main: '#d32f2f'
        },
        grey: {
            main: '#b1b1b1',
            dark: '#6a6a6a',
            light: '#dcdcdc',
        }
    },
    shape: {
        borderRadius: {
            max: 10000,
            hard: 50,
            smooth: 10
        },
    },
    typography: {
        header: {
            fontSize: 30,
            fontWeight: '600',
        } as TextStyle,
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
        ), [theme, props, creator]);

        return styles;
    }
}