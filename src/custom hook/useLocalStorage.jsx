import React, { useEffect, useState } from 'react'

function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {
        const jsonValue = JSON.parse(localStorage.getItem(key))
        if(jsonValue) return jsonValue
        if(initialValue  instanceof Function) return initialValue()
        return initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

  return [value, setValue]
}

export default useLocalStorage