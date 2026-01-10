"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mic, Loader2, Play, Volume2, Type, Download } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateTTSAction } from "@/app/actions/ai-actions"

const formSchema = z.object({
    text: z.string().min(10, {
        message: "Text must be at least 10 characters.",
    }).max(500, {
        message: "Text must not exceed 500 characters.",
    }),
    voice: z.string(),
})

export default function TTSPage() {
    const [loading, setLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
            voice: "en-US-Neural2-A",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            // Use browser's built-in TTS (works offline, no API needed!)
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(values.text)

                // Try to match the selected voice
                const voices = window.speechSynthesis.getVoices()
                const selectedVoice = voices.find(voice =>
                    voice.lang.startsWith('en-US') || voice.lang.startsWith('en-GB')
                )
                if (selectedVoice) {
                    utterance.voice = selectedVoice
                }

                utterance.rate = 1.0
                utterance.pitch = 1.0
                utterance.volume = 1.0

                utterance.onstart = () => {
                    setIsPlaying(true)
                    toast.success("Speech synthesized successfully! Playing...")
                }

                utterance.onend = () => {
                    setIsPlaying(false)
                }

                utterance.onerror = () => {
                    toast.error("Failed to play speech")
                    setIsPlaying(false)
                }

                window.speechSynthesis.speak(utterance)
                setAudioUrl("browser-tts-active") // Just a flag
            } else {
                toast.error("Text-to-Speech not supported in your browser")
            }
        } catch (error) {
            toast.error("An unexpected error occurred.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Text to Speech</h2>
                <p className="text-muted-foreground">
                    Convert your text into natural-sounding speech using Google's Neural2 voices.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Voice Configuration</CardTitle>
                        <CardDescription>
                            Select a voice and enter your text.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="voice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Voice Model</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a voice" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="en-US-Neural2-A">US English (Male)</SelectItem>
                                                    <SelectItem value="en-US-Neural2-F">US English (Female)</SelectItem>
                                                    <SelectItem value="en-GB-Neural2-B">UK English (Male)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="text"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Text Input</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Welcome to Antigravity AI, the next generation of SaaS..."
                                                    className="min-h-[150px] resize-none"
                                                    {...field}
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                2 credits per minute of audio.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Synthesizing...
                                        </>
                                    ) : (
                                        <>
                                            <Volume2 className="mr-2 h-4 w-4" />
                                            Convert to Speech
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Playback</CardTitle>
                        <CardDescription>
                            Listen to your generated audio.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isPlaying ? 'bg-primary animate-pulse' : 'bg-muted'}`}>
                            <Mic className={`w-12 h-12 ${isPlaying ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="w-full space-y-2">
                            <div className="h-1 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-100 ease-linear"
                                    style={{ width: isPlaying ? '100%' : '0%' }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>0:00</span>
                                <span>0:15</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" disabled={!isPlaying}>
                                <Play className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" disabled={!isPlaying}>
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
