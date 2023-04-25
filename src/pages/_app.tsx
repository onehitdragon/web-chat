import React from "react";

export default function MyApp({ children }: { children: React.ReactNode }) {
    return <div className="App">
        { children }
    </div>
}