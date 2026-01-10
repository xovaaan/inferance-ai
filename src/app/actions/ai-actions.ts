"use server"

import { generateImage, generateVideo, generateTTS } from "@/lib/huggingface-ai"

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

export async function generateTTSAction(text: string, voice?: string) {
    try {
        // Check credits
        if (mockCredits < 2) {
            return { success: false, error: "Insufficient credits. (Demo: Need 2 credits, you have " + mockCredits + ")" }
        }

        // Deduct credits
        mockCredits -= 2

        // Generate speech using Hugging Face
        const audioUrl = await generateTTS(text)

        return { success: true, url: audioUrl, creditsRemaining: mockCredits }
    } catch (error: any) {
        console.error("TTS generation error:", error)
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
