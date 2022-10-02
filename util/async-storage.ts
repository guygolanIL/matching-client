import { useAsyncStorage as useDefaultAsyncStorage } from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageKeys = '@user-token' | '@refresh-token';

export function getItem(key: StorageKeys) {
    return AsyncStorage.getItem(key);
}

export function setItem(key: StorageKeys, value: string) {
    return AsyncStorage.setItem(key, value);
}

export function useAsyncStorage(key: StorageKeys) {
    return useDefaultAsyncStorage(key);
}