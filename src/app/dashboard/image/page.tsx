"use client"

import { GradientLoader } from "@/components/gradient-loader"
import { useMinimumLoading } from "@/hooks/use-minimum-loading"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Wand2, Loader2, Download } from "lucide-react"

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
import { generateImageAction } from "@/app/actions/ai-actions"

const formSchema = z.object({
    prompt: z.string().min(2, {
        message: "Prompt must be at least 2 characters.",
    }),
})

export default function ImagePage() {
    const { isLoading, startLoading, stopLoading } = useMinimumLoading()
    const [output, setOutput] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        startLoading()
        setOutput(null)
        try {
            const result = await generateImageAction(values.prompt)

            if (result.success && result.url) {
                setOutput(result.url)
                toast.success("Image generated successfully!")
            } else {
                toast.error(result.error || "Failed to generate image.")
            }
        } catch (error) {
            toast.error("An unexpected error occurred.")
        } finally {
            stopLoading()
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Text to Image</h2>
                <p className="text-muted-foreground">
                    Transform your descriptions into stunning AI-generated imagery.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Generation Settings</CardTitle>
                        <CardDescription>
                            Enter a detailed prompt to get the best results.
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
                                            <FormLabel>Prompt</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="A futuristic city with flying cars and neon lights..."
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Be specific for better quality. 1 credit per image.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="mr-2 h-4 w-4" />
                                            Generate Image
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col items-center justify-center min-h-[400px] bg-slate-950 text-white overflow-hidden relative border-none">
                    {isLoading ? (
                        <GradientLoader />
                    ) : output ? (
                        <div className="relative w-full h-full group">
                            <img
                                src={output}
                                alt="Generated artwork"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    onClick={() => {
                                        const link = document.createElement('a')
                                        link.href = output
                                        link.download = `inferance-ai-image-${Date.now()}.png`
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
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                                <Wand2 className="w-8 h-8 text-white/70" />
                            </div>
                            <div>
                                <p className="font-medium">No image generated yet</p>
                                <p className="text-sm text-white/50">Your creation will appear here</p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
