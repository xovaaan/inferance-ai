"use client"

import { GradientLoader } from "@/components/gradient-loader"
import { useMinimumLoading } from "@/hooks/use-minimum-loading"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mic, Loader2, Play, Volume2, Upload, Download } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateSTSAction } from "@/app/actions/ai-actions"
import { VOICES } from "@/lib/elevenlabs-ai"

// Define max file size (4MB)
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/x-m4a"];

const formSchema = z.object({
    voice: z.string(),
    audio: z
        .custom<FileList>()
        .refine((files) => files?.length === 1, "Audio file is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
        .refine(
            (files) => ACCEPTED_AUDIO_TYPES.includes(files?.[0]?.type),
            "Only .mp3, .wav, and .m4a formats are supported."
        ),
})

export default function VoiceChangerPage() {
    const { isLoading, startLoading, stopLoading } = useMinimumLoading()
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [inputAudioUrl, setInputAudioUrl] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            voice: VOICES[0].id,
            audio: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        startLoading()
        setAudioUrl(null)
        try {
            const formData = new FormData()
            formData.append('audio', values.audio[0])
            formData.append('voiceId', values.voice)

            const result = await generateSTSAction(formData)

            if (result.success && result.url) {
                setAudioUrl(result.url)
                toast.success("Voice transformed successfully!")
            } else {
                toast.error(result.error || "Failed to transform voice")
            }
        } catch (error) {
            toast.error("An unexpected error occurred.")
        } finally {
            stopLoading()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setInputAudioUrl(url)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Voice Changer</h2>
                <p className="text-muted-foreground">
                    Transform your voice into any of our AI voices.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Input Configuration</CardTitle>
                        <CardDescription>
                            Upload an audio file and select a target voice.
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
                                            <FormLabel>Target Voice</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a voice" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {VOICES.map((voice) => (
                                                        <SelectItem key={voice.id} value={voice.id}>
                                                            {voice.name} ({voice.gender})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="audio"
                                    render={({ field: { onChange, value, ...rest } }) => (
                                        <FormItem>
                                            <FormLabel>Audio File</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept=".mp3,.wav,.m4a"
                                                    disabled={isLoading}
                                                    {...rest}
                                                    onChange={(e) => {
                                                        onChange(e.target.files)
                                                        handleFileChange(e)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Max 4MB. Format: mp3, wav, m4a.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {inputAudioUrl && (
                                    <div className="mt-2">
                                        <p className="text-sm font-medium mb-1">Input Preview:</p>
                                        <audio controls src={inputAudioUrl} className="w-full h-8" />
                                    </div>
                                )}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Transforming...
                                        </>
                                    ) : (
                                        <>
                                            <Volume2 className="mr-2 h-4 w-4" />
                                            Transform Voice
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Result</CardTitle>
                        <CardDescription>
                            Listen to your transformed audio.
                        </CardDescription>
                    </CardHeader>
                    {isLoading ? (
                        <CardContent className="flex-1 flex items-center justify-center">
                            <GradientLoader />
                        </CardContent>
                    ) : (
                        <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isPlaying ? 'bg-primary animate-pulse' : 'bg-muted'}`}>
                                <Mic className={`w-12 h-12 ${isPlaying ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                            </div>

                            <div className="w-full">
                                {audioUrl ? (
                                    <audio
                                        controls
                                        src={audioUrl}
                                        className="w-full"
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                        onEnded={() => setIsPlaying(false)}
                                    />
                                ) : (
                                    <div className="text-center text-muted-foreground text-sm">
                                        Transformed audio will appear here
                                    </div>
                                )}
                            </div>

                            {audioUrl && (
                                <div className="flex justify-center">
                                    <Button variant="outline" asChild>
                                        <a href={audioUrl} download="voice-changed.mp3">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download MP3
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    )
}
