"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Video, Mic, Sparkles, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const quickActions = [
    {
        title: "Generate Image",
        description: "Create stunning AI-generated images from text",
        icon: ImageIcon,
        href: "/dashboard/image",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    {
        title: "Generate Video",
        description: "Transform text into cinematic video clips",
        icon: Video,
        href: "/dashboard/video",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    },
    {
        title: "Generate Speech",
        description: "Convert text to natural-sounding voice",
        icon: Mic,
        href: "/dashboard/tts",
        color: "text-green-500",
        bgColor: "bg-green-500/10"
    }
]

const stats = [
    { label: "Credits Remaining", value: "10", icon: Zap },
    { label: "Generations This Month", value: "0", icon: TrendingUp },
    { label: "Total Creations", value: "0", icon: Sparkles },
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome Back!</h2>
                <p className="text-muted-foreground">
                    Start creating amazing content with AI-powered tools.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quickActions.map((action) => (
                        <Link href={action.href} key={action.title}>
                            <Card className="hover:border-primary/50 transition-all cursor-pointer group">
                                <CardHeader>
                                    <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <action.icon className={`w-6 h-6 ${action.color}`} />
                                    </div>
                                    <CardTitle>{action.title}</CardTitle>
                                    <CardDescription>{action.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="ghost" className="w-full">
                                        Get Started →
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Getting Started */}
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle>🎉 Getting Started</CardTitle>
                    <CardDescription>
                        New to Antigravity AI? Here's how to make the most of your experience:
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                        <div>
                            <p className="font-medium">Choose Your Tool</p>
                            <p className="text-sm text-muted-foreground">Select from Image, Video, or Speech generation above</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                        <div>
                            <p className="font-medium">Enter Your Prompt</p>
                            <p className="text-sm text-muted-foreground">Describe what you want to create in detail</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                        <div>
                            <p className="font-medium">Download & Share</p>
                            <p className="text-sm text-muted-foreground">Save your creations and share them with the world</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
