/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useCallback, useMemo, useState } from "react";
import Loader from "../components/Loader";

export const LoadingContext = createContext({
    loading: false,
    showLoading: () => {},
    hideLoading: () => {},
});

export function LoadingContextProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const showLoading = useCallback(() => {
        setLoading(true);
    });

    const hideLoading = useCallback(() => {
        setLoading(false);
    });

    const context = useMemo(() => ({ loading, showLoading, hideLoading , setLoading}), [loading, showLoading, hideLoading, setLoading]);

    return (
        <LoadingContext.Provider value={context}>
            {children}
            <Loader isLoaderShow={loading} />
        </LoadingContext.Provider>
    );
}
