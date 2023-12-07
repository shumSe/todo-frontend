import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            console.log("loading try "+ isLoading)
            await callback(...args)
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false)
            console.log("loading finaly "+ isLoading)
        }
    }

    return [fetching, isLoading, error]
}