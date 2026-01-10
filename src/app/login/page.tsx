"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Loader2, Mail, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("Please enter email and password")
            return
        }

        setLoading(true)

        // Mock authentication - accept any email/password
        setTimeout(() => {
            // Store mock user in localStorage
            localStorage.setItem("mockUser", JSON.stringify({
                email,
                id: "mock-user-" + Date.now(),
                full_name: email.split("@")[0]
            }))

            toast.success("Login successful!")
            router.push("/dashboard")
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 selection:bg-primary/30">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="flex flex-col items-center gap-4 mb-8">
                    <img src="/logo.svg" alt="Inference AI Logo" className="w-16 h-16" />
                    <h1 className="text-3xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Inference AI
                        </span>
                    </h1>
                    <p className="text-white/70">Welcome back!</p>
                </div>

                <Card className="border-white/10 bg-white/[0.02] backdrop-blur-sm text-white">
                    <CardHeader>
                        <CardTitle className="text-white">Sign In</CardTitle>
                        <CardDescription className="text-white/50">
                            Enter any email and password to sign in (demo mode)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white/70">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-white/30" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-white/20"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pass" className="text-white/70">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-white/30" />
                                    <Input
                                        id="pass"
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-white/20"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-white/90"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In with Email"}
                            </Button>
                        </form>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-black px-2 text-white/30">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full border-white/10 bg-transparent hover:bg-white/5 text-white"
                            onClick={handleLogin}
                        >
                            <Github className="mr-2 h-4 w-4" />
                            Sign in with Google
                        </Button>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <p className="text-xs text-center text-white/30">
                            By clicking continue, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
