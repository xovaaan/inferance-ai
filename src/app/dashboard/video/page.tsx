"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Video, Loader2, Play, History, Sparkles, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const formSchema = z.object({
    prompt: z.string().min(10, {
        message: "Prompt must be at least 10 characters for better video quality.",
    }),
})

import { generateVideoAction } from "@/app/actions/ai-actions"

export default function VideoPage() {
    const [loading, setLoading] = useState(false)
    const [output, setOutput] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const result = await generateVideoAction(values.prompt)

            if (result.success && result.url) {
                setOutput(result.url)
                toast.success("Video generated successfully!")
            } else {
                toast.error(result.error || "Failed to generate video.")
            }
        } catch (error) {
            toast.error("An unexpected error occurred.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Text to Video</h2>
                    <p className="text-muted-foreground">
                        Create high-quality cinematic videos from your text prompts.
                    </p>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Beta
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Video Controls</CardTitle>
                        <CardDescription>
                            Describe the motion and scene details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="prompt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Scene Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="A cinematic shot of a dragon flying over a mountain range..."
                                                    {...field}
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                10 credits per 5s video.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Rendering Video...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="mr-2 h-4 w-4" />
                                            Generate Video
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col items-center justify-center min-h-[400px] bg-slate-950 text-white overflow-hidden relative border-none">
                    {output ? (
                        <div className="relative w-full h-full group">
                            <img
                                src={output}
                                alt="Generated cinematic frame"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-xs text-white/90">
                                <p className="font-semibold">Note: Video generation displays a high-quality cinematic still frame</p>
                                <p className="text-white/60 mt-1">Full video generation requires additional setup. This image captures your concept!</p>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    onClick={() => {
                                        const link = document.createElement('a')
                                        link.href = output
                                        link.download = `inferance-ai-video-${Date.now()}.png`
                                        link.click()
                                    }}
                                    className="bg-white/90 text-black hover:bg-white"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <CardContent className="p-6 text-center space-y-4 relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                                <Video className="w-8 h-8 text-white/70" />
                            </div>
                            <div>
                                <p className="font-medium">Video Preview</p>
                                <p className="text-sm text-white/50 text-balance">The preview of your generated video will appear here.</p>
                            </div>
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    )
}
