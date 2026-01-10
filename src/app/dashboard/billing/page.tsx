"use client"

import { Check, Zap, Rocket, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for exploring our AI capabilities.",
        features: ["10 credits / mo", "Standard generation speed", "Community support"],
        icon: Zap,
        current: true
    },
    {
        name: "Pro",
        price: "$19",
        description: "For creators who need more power.",
        features: ["1,000 credits / mo", "Fast generation speed", "Priority support", "Unsplash integration"],
        icon: Rocket,
        current: false
    },
    {
        name: "Business",
        price: "$49",
        description: "Scale your creative production.",
        features: ["5,000 credits / mo", "Ultra-fast speed", "Dedicated account manager", "API Access"],
        icon: Building2,
        current: false
    }
]

export default function BillingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Billing & Subscriptions</h2>
                <p className="text-muted-foreground">
                    Manage your plan and purchase additional credits.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <Card key={plan.name} className={plan.current ? "border-primary shadow-lg" : ""}>
                        <CardHeader>
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <plan.icon className="w-5 h-5" />
                                <span className="font-semibold uppercase tracking-wider text-xs">{plan.name}</span>
                            </div>
                            <CardTitle className="text-3xl">{plan.price}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant={plan.current ? "outline" : "default"}
                                className="w-full"
                                disabled={plan.current}
                            >
                                {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle>Need more credits?</CardTitle>
                    <CardDescription>
                        You can top up your balance without upgrading your plan.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="secondary">Buy Credits</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
