import { Audio, AVPlaybackSource } from "expo-av";
import { useEffect, useState } from "react";

export function useSound(soundSource: AVPlaybackSource) {
    const [loadedSound, setLoadedSound] = useState<Audio.Sound>();

    useEffect(() => {
        return () => {
            loadedSound?.unloadAsync();
        }
    }, [soundSource]);

    return {
        async play() {
            const { sound } = await Audio.Sound.createAsync(soundSource);
            setLoadedSound(sound);
            sound.playAsync();
        }
    }
}