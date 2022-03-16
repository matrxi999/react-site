import { useState, useEffect } from "react";


const useFetch = (url) => {
    const [data, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() =>{
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok){
                    throw Error('Could not fetch the data for this resource')
                }
                return res.json();
            })
            .then(data => {
                setBlogs(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(error.message);
                }
            })

        return () => abortCont.abort();
    }, [url]);
    
    return {data, isPending ,error}
}

export default useFetch;