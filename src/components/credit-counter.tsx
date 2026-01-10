"use client"

import { Progress } from "@/components/ui/progress"
import { Coins } from "lucide-react"

// In a real app, these would come from Supabase/Context
const credits = 10
const maxCredits = 100

export function CreditCounter() {
    const percentage = (credits / maxCredits) * 100

    return (
        <div className="flex flex-col gap-2 group-data-[collapsible=icon]:hidden">
            <div className="flex items-center justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-primary" />
                    <span>Credits</span>
                </div>
                <span>{credits} / {maxCredits}</span>
            </div>
            <Progress value={percentage} className="h-1.5" />
            <p className="text-[10px] text-muted-foreground">
                Resetting in 14 days
            </p>
        </div>
    )
}
