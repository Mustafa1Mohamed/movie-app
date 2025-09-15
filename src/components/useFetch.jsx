import { useEffect, useState, useCallback } from "react";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData, url]);

    return { data, loading, error, refetch: fetchData };
}

export default useFetch;
