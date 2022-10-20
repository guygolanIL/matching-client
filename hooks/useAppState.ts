import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type Options = {
    onChange(newState: AppStateStatus): void;
}
export function useAppState(options: Options) {

    useEffect(() => {

        const subscription = AppState.addEventListener('change', options.onChange);

        return () => subscription.remove();
    }, []);

    return {
        current: AppState.currentState
    };
}