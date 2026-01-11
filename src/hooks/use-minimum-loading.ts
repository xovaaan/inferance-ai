import { useState, useCallback, useRef } from "react"

export function useMinimumLoading(minDuration = 5000) {
    const [isLoading, setIsLoading] = useState(false)
    const startTimeRef = useRef<number>(0)
    const timeoutRef = useRef<NodeJS.Timeout>()

    const startLoading = useCallback(() => {
        setIsLoading(true)
        startTimeRef.current = Date.now()
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }, [])

    const stopLoading = useCallback(() => {
        const elapsed = Date.now() - startTimeRef.current
        const remaining = Math.max(0, minDuration - elapsed)

        if (remaining > 0) {
            timeoutRef.current = setTimeout(() => {
                setIsLoading(false)
            }, remaining)
        } else {
            setIsLoading(false)
        }
    }, [minDuration])

    return { isLoading, startLoading, stopLoading }
}
