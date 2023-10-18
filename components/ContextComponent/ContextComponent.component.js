"use client"

import { createContext, useMemo, useState } from "react"

export const RootContext = createContext(null)

export default function ContextComponent({ children }) {
    const [name, setName] = useState("Dicki")

    const contextValue = useMemo(() => {
        return { name, setName };
    }, [name]);

    return (
        <RootContext.Provider value={contextValue}>
            {children}
        </RootContext.Provider>
    )
}
