"use server"
import * as fs from 'fs'
import * as path from 'path'

import { generateImage, generateVideo, generateTTS as generateHFTTS } from "@/lib/huggingface-ai"
import { generateSTS, createVoiceClone } from "@/lib/elevenlabs-ai"

// Simple in-memory credit tracking for demo
let mockCredits = 100

export async function generateImageAction(prompt: string) {
    try {
        // Check credits
        if (mockCredits < 1) {
            return { success: false, error: "Insufficient credits. (Demo: You have 0 credits)" }
        }

        // Deduct credits
        mockCredits -= 1

        // Generate image using Hugging Face
        const imageUrl = await generateImage(prompt)

        return { success: true, url: imageUrl, creditsRemaining: mockCredits }
    } catch (error: any) {
        console.error("Image generation error:", error)
        return {
            success: false,
            error: error?.message || "Failed to generate image. Check your HUGGINGFACE_API_KEY in .env.local"
        }
    }
}

export async function generateVideoAction(prompt: string) {
    try {
        // Check credits
        if (mockCredits < 10) {
            return { success: false, error: "Insufficient credits. (Demo: Need 10 credits, you have " + mockCredits + ")" }
        }

        // Deduct credits
        mockCredits -= 10

        // Generate video (currently returns high-quality image)
        const videoUrl = await generateVideo(prompt)

        return {
            success: true,
            url: videoUrl,
            creditsRemaining: mockCredits,
            note: "Video generation returns a cinematic still image (Hugging Face video models are slow)"
        }
    } catch (error: any) {
        console.error("Video generation error:", error)
        return {
            success: false,
            error: error?.message || "Failed to generate video. Check your HUGGINGFACE_API_KEY in .env.local"
        }
    }
}

const logFile = path.join(process.cwd(), 'tts-debug.log')
function log(msg: string) {
    const entry = `[${new Date().toISOString()}] ${msg}\n`
    fs.appendFileSync(logFile, entry)
    console.log(msg)
}

export async function generateTTSAction(text: string, voice?: string) {
    log(`🚀 generateTTSAction started (Hugging Face): ${text.substring(0, 20)}... Voice: ${voice || 'default'}`)
    try {
        // Check credits
        if (mockCredits < 2) {
            log(`⚠️ Insufficient credits: ${mockCredits}`)
            return { success: false, error: "Insufficient credits. (Demo: Need 2 credits, you have " + mockCredits + ")" }
        }

        // Deduct credits
        mockCredits -= 2

        // Generate speech using Hugging Face
        log(`📡 Calling Hugging Face TTS with model ${voice || 'default'}...`)
        const audioUrl = await generateHFTTS(text, voice)
        log(`✅ TTS generation successful, URL length: ${audioUrl.length}`)

        return { success: true, url: audioUrl, creditsRemaining: mockCredits }
    } catch (error: any) {
        log(`❌ TTS generation error: ${error?.message || error}`)
        return {
            success: false,
            error: error?.message || "Failed to generate speech. Check your HUGGINGFACE_API_KEY in .env.local"
        }
    }
}

// Get current credits (for display)
export async function getCredits() {
    return { credits: mockCredits }
}

// Reset credits (for testing)
export async function resetCredits() {
    mockCredits = 100
    return { credits: mockCredits }
}

export async function generateSTSAction(formData: FormData) {
    try {
        const audioFile = formData.get('audio') as File
        const voiceId = formData.get('voiceId') as string

        if (!audioFile || !voiceId) {
            return { success: false, error: "Missing audio file or voice ID" }
        }

        log(`🚀 generateSTSAction started for voice: ${voiceId}`)

        // Check credits
        if (mockCredits < 5) {
            return { success: false, error: "Insufficient credits. (Need 5 credits)" }
        }
        mockCredits -= 5

        const arrayBuffer = await audioFile.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: audioFile.type })

        log("📡 Calling ElevenLabs STS...")
        const audioUrl = await generateSTS(blob, voiceId)
        log(`✅ STS generation successful`)

        return { success: true, url: audioUrl, creditsRemaining: mockCredits }
    } catch (error: any) {
        log(`❌ STS generation error: ${error?.message || error}`)
        return {
            success: false,
            error: error?.message || "Failed to transform voice."
        }
    }
}

export async function cloneVoiceAction(formData: FormData) {
    try {
        const name = formData.get('name') as string
        const files = formData.getAll('files') as File[]

        if (!name || files.length === 0) {
            return { success: false, error: "Missing voice name or audio files" }
        }

        log(`🚀 cloneVoiceAction started for: ${name} with ${files.length} files`)

        // Check credits
        if (mockCredits < 20) {
            return { success: false, error: "Insufficient credits. (Need 20 credits)" }
        }
        mockCredits -= 20

        log("📡 Calling ElevenLabs Voice Clone...")
        const voiceId = await createVoiceClone(name, files)
        log(`✅ Voice clone successful, ID: ${voiceId}`)

        return { success: true, voiceId: voiceId, creditsRemaining: mockCredits }
    } catch (error: any) {
        log(`❌ Voice clone error: ${error?.message || error}`)
        return {
            success: false,
            error: error?.message || "Failed to clone voice."
        }
    }
}
