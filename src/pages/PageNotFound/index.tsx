import { useState } from "react";

export const PageNotFound = () => {
    const [ timeRemaning, setTimeRemaning ] = useState(10)
    
    setTimeout(() => {
        window.location.href = "/home"
    }, 1000);// 1 segundo

    return (
        <div>Page Not Found</div>
    )
}