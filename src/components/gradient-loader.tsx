"use client"

import React from "react"
import { cn } from "@/lib/utils"

export function GradientLoader({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
            <div className="relative h-16 w-16 animate-spin rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 p-1 [animation-duration:3s]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 opacity-75 blur-md animate-pulse" />
                <div className="h-full w-full rounded-full bg-background" />
            </div>
            <p className="text-sm text-muted-foreground animate-pulse">Generating magic...</p>
        </div>
    )
}
