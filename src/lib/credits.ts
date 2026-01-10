import { supabaseAdmin } from "./supabase"

export const CREDIT_COSTS = {
    image: 1,
    video: 10,
    tts: 2,
}

export async function checkAndDeductCredits(userId: string, type: keyof typeof CREDIT_COSTS) {
    const cost = CREDIT_COSTS[type]

    // Get current credits
    const { data: user, error: fetchError } = await supabaseAdmin
        .from("users")
        .select("credits")
        .eq("id", userId)
        .single()

    if (fetchError || !user) {
        throw new Error("User not found or credit check failed")
    }

    if (user.credits < cost) {
        throw new Error("Insufficient credits")
    }

    // Deduct credits
    const { error: updateError } = await supabaseAdmin
        .from("users")
        .update({ credits: user.credits - cost })
        .eq("id", userId)

    if (updateError) {
        throw new Error("Failed to deduct credits")
    }

    // Log usage
    await supabaseAdmin.from("usage_logs").insert({
        user_id: userId,
        action: `generate_${type}`,
        cost: cost,
    })

    return true
}

export async function logGeneration(userId: string, type: string, prompt: string, outputUrl: string, status: string) {
    await supabaseAdmin.from("generations").insert({
        user_id: userId,
        type,
        prompt,
        output_url: outputUrl,
        credits_used: CREDIT_COSTS[type as keyof typeof CREDIT_COSTS] || 0,
        status,
    })
}
