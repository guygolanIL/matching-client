import * as Location from 'expo-location';

import { useState, useEffect } from 'react';
export function useLocation() {
    const [location, setLocation] = useState<Location.LocationObject>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        async function requestLocation() {
            try {
                const permissions = await Location.requestForegroundPermissionsAsync();
                console.log(permissions);

                if (!permissions.granted) {
                    setError('Location permissions required');
                    setIsLoading(false);
                    return;
                }

                const location = await Location.getCurrentPositionAsync();
                setLocation(location);
            } catch (error) {
                setError('Location error');
            } finally {
                setIsLoading(false);
            }
        }

        requestLocation();
    }, []);

    return {
        location,
        isLoading,
        error
    }
}