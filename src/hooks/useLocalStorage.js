import React from "react";

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))    
    if (savedValue) return savedValue
    if (initialValue instanceof Function) return initialValue()
    return initialValue
}

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = React.useState(() => getSavedValue(key, initialValue))

    React.useEffect(() => {
        if (value) localStorage.setItem(key, JSON.stringify(value))                        
    },[value, key])
    
    return [value, setValue]
}