import { useState, useEffect } from 'react';

// We can directly export the function withouth name. We can also do
// const SetError = httpClient => {
// And then export the funtion at the end of the file
export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null)
        return req;
    })
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });
    
    // We can pass a cleanup function as a return to useEffect. 
    // In this case we will clean up whenever the interceptors change
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor, httpClient.interceptors]);

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler];
}