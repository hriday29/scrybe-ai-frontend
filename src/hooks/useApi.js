import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const execute = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await apiFunc();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [apiFunc]);

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, isLoading, error, execute };
};