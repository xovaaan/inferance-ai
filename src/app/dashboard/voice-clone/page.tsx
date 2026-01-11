"use client"

import { GradientLoader } from "@/components/gradient-loader"
import { useMinimumLoading } from "@/hooks/use-minimum-loading"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mic, Loader2, Upload, FileAudio, Copy } from "lucide-react"

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
import { cloneVoiceAction } from "@/app/actions/ai-actions"

// Max 10MB total
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/x-m4a"];

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    files: z
        .custom<FileList>()
        .refine((files) => files?.length > 0, "At least one audio sample is required.")
        .refine((files) => {
            let totalSize = 0;
            for (let i = 0; i < files.length; i++) totalSize += files[i].size;
            return totalSize <= MAX_FILE_SIZE;
        }, `Total file size must be less than 10MB.`)
        .refine(
            (files) => {
                for (let i = 0; i < files.length; i++) {
                    if (!ACCEPTED_AUDIO_TYPES.includes(files[i].type)) return false;
                }
                return true;
            },
            "Only .mp3, .wav, and .m4a formats are supported."
        ),
})

export default function VoiceClonePage() {
    const { isLoading, startLoading, stopLoading } = useMinimumLoading()
    const [voiceId, setVoiceId] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            files: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        startLoading()
        setVoiceId(null)
        try {
            const formData = new FormData()
            formData.append('name', values.name)
            for (let i = 0; i < values.files.length; i++) {
                formData.append('files', values.files[i])
            }

            const result = await cloneVoiceAction(formData)

            if (result.success && result.voiceId) {
                setVoiceId(result.voiceId)
                toast.success("Voice cloned successfully!")
            } else {
                toast.error(result.error || "Failed to clone voice")
            }
        } catch (error) {
            toast.error("An unexpected error occurred.")
        } finally {
            stopLoading()
        }
    }

    const copyToClipboard = () => {
        if (voiceId) {
            navigator.clipboard.writeText(voiceId)
            toast.success("Voice ID copied to clipboard")
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Instant Voice Cloning</h2>
                <p className="text-muted-foreground">
                    Clone a voice from audio samples in seconds.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Voice Configuration</CardTitle>
                        <CardDescription>
                            Provide a name and audio samples (min 1 min recommended).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Voice Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. My Custom Voice" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="files"
                                    render={({ field: { onChange, value, ...rest } }) => (
                                        <FormItem>
                                            <FormLabel>Audio Samples</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    multiple
                                                    accept=".mp3,.wav,.m4a"
                                                    disabled={isLoading}
                                                    {...rest}
                                                    onChange={(e) => {
                                                        onChange(e.target.files)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Upload high-quality samples. Total max 10MB.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Cloning...
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="mr-2 h-4 w-4" />
                                            Clone Voice
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
                            Your new voice identity.
                        </CardDescription>
                    </CardHeader>
                    {isLoading ? (
                        <CardContent className="flex-1 flex items-center justify-center">
                            <GradientLoader />
                        </CardContent>
                    ) : (
                        <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${voiceId ? 'bg-green-100 dark:bg-green-900' : 'bg-muted'}`}>
                                <FileAudio className={`w-12 h-12 ${voiceId ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                            </div>

                            <div className="w-full text-center">
                                {voiceId ? (
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg">Voice Created!</h3>
                                        <p className="text-sm text-muted-foreground">Now you can use this voice ID in your integrations.</p>
                                        <div className="flex items-center justify-center gap-2 mt-4 p-2 bg-muted rounded-md">
                                            <code className="text-sm font-mono">{voiceId}</code>
                                            <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-8 w-8">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted-foreground text-sm">
                                        Cloned voice details will appear here
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    )
}
