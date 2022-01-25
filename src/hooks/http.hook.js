import {useState, useCallback} from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [newItemsLoading, togglenewItemsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState("waiting");
    
    const onSetProcess = (value) => {
        setProcess(value);
    };
    const request = useCallback(async (url, method = "GET", body = null, headers = {"Content-Type": "application/json"}) => {
        onSetProcess("loading");
        
        if (!newItemsLoading) {
            setLoading(true);
        }

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                onSetProcess("error");
                throw new Error(`This url ${url} throw error: ${response.status}`);
            }

            const data = await response.json();
            onSetProcess("done");
            setLoading(false);
            togglenewItemsLoading(false);
            return data;
        } catch(e) {
            onSetProcess("error");
            setLoading(false);
            togglenewItemsLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading,
            newItemsLoading,
            togglenewItemsLoading,
            request,
            error,
            clearError,
            process,
            onSetProcess,
             };
};

export default useHttp;