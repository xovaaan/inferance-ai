"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Wand2, Video, Mic, ArrowRight, Github, Twitter, Sparkles, Zap, Shield, Rocket, Globe, BarChart, Users, Check, Quote, ChevronDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg" },
  { name: "Giga.ai", logo: null } // We'll render this as text-logo
]

const features = [
  {
    title: "Lightning Fast",
    description: "Generate high-quality content in seconds with our optimized AI pipeline",
    icon: Zap,
    image: "/lightning-bg.png"
  },
  {
    title: "Enterprise Security",
    description: "Bank-level encryption and data protection for your peace of mind",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Global Scale",
    description: "Distributed infrastructure across 5 continents for 99.9% uptime",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Advanced Analytics",
    description: "Track performance and optimize your content strategy with detailed insights",
    icon: BarChart,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Creative Director",
    company: "DesignStudio",
    content: "Inferance AI has revolutionized our creative workflow. What used to take days now takes minutes.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
  },
  {
    name: "Michael Rodriguez",
    role: "Marketing Lead",
    company: "TechCorp",
    content: "The quality of AI-generated content is exceptional. It's become an essential tool for our team.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    name: "Emily Watson",
    role: "Content Creator",
    company: "MediaPro",
    content: "I can finally focus on strategy while AI handles the heavy lifting. Absolutely game-changing.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80"
  },
]

const faqs = [
  {
    q: "How does the credit system work?",
    a: "Credits are consumed based on the type of generation. Images cost 1 credit, videos cost 10 credits, and TTS costs 2 credits per minute."
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes, you can change your plan at any time. Changes take effect immediately and are prorated."
  },
  {
    q: "What AI models do you use?",
    a: "We use Google's latest AI models including Imagen for images, Veo for videos, and Neural2 voices for speech."
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use enterprise-grade encryption and never share your data with third parties."
  },
]

const blogPosts = [
  {
    title: "The Future of AI-Generated Content",
    excerpt: "Explore how generative AI is transforming creative industries...",
    date: "Jan 10, 2026",
    category: "AI Trends",
    image: "/blog-future.png"
  },
  {
    title: "10 Tips for Better AI Prompts",
    excerpt: "Learn how to craft prompts that produce stunning results...",
    date: "Jan 8, 2026",
    category: "Tutorial",
    image: "/blog-tips.png"
  },
  {
    title: "Case Study: Marketing Team Success",
    excerpt: "How a marketing team saved 50% time with Inferance AI...",
    date: "Jan 5, 2026",
    category: "Case Study",
    image: "/blog-case-study.png"
  },
]

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for exploring",
    features: ["10 credits/month", "Standard speed", "Community support"],
    icon: Zap,
    popular: false
  },
  {
    name: "Pro",
    price: "$19",
    description: "For serious creators",
    features: ["1,000 credits/month", "Fast speed", "Priority support", "API access"],
    icon: Rocket,
    popular: true
  },
  {
    name: "Business",
    price: "$49",
    description: "For teams & agencies",
    features: ["5,000 credits/month", "Ultra-fast speed", "Dedicated manager", "Custom integrations"],
    icon: Users,
    popular: false
  }
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-primary/30 overflow-x-hidden">
      {/* Background Image for Navbar + Hero */}
      <div className="fixed top-0 left-0 right-0 h-screen z-0">
        <img
          src="/hero-bg.jpg"
          alt="Starry night background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="relative flex items-center justify-between px-6 py-4 backdrop-blur-xl sticky top-0 z-50 border-b border-white/20 bg-white/5 shadow-2xl">
          <div className="flex items-center gap-3 font-bold text-xl">
            <img src="/logo.svg" alt="Inference AI Logo" className="w-8 h-8" />
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Inference AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white/70 hover:text-white">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-white text-black hover:bg-gray-300 font-semibold">Get Started</Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center overflow-hidden min-h-screen">
          {/* Content is relative to show above background */}


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-5xl relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white">Trusted by 10,000+ creators worldwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent py-2"
            >
              Create Anything,<br />Instantly with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Transform your ideas into stunning visuals, cinematic videos, and natural speech with the world's most advanced AI platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link href="/login">
                <Button size="lg" className="h-14 px-8 text-base bg-white text-black hover:bg-gray-300 font-semibold shadow-2xl shadow-white/20">
                  Start Creating Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base border-white/20 hover:bg-white/10 bg-white/5 backdrop-blur-sm text-white font-medium">
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-20 w-full max-w-6xl relative"
          >
            <div className="aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30 shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80"
                alt="AI Dashboard"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </motion.div>
        </section>

        {/* Companies Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-12 border-y border-white/5 bg-black relative z-10"
        >
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-white/30 text-sm mb-8 uppercase tracking-wider">Trusted by innovative companies</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
              {companies.map((company, idx) => (
                <motion.div
                  key={typeof company === 'string' ? company : company.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.6, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 py-4"
                >
                  {typeof company !== 'string' && company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-10 md:h-16 w-auto object-contain brightness-200"
                    />
                  ) : (
                    <span className="font-bold text-2xl md:text-5xl tracking-tighter text-white/80">
                      {typeof company === 'string' ? company : company.name}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Bento Grid */}
        <section id="features" className="py-32 px-6 bg-black relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Powerful Features
                </h2>
                <p className="text-white/50 text-lg">Everything you need to create amazing content</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                >
                  <Card className="group relative overflow-hidden border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-primary/50 transition-all h-full">
                    {/* Feature Image */}
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <CardContent className="relative p-8 flex flex-col justify-end min-h-[280px]">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                      <p className="text-white/60">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Services Showcase */}
        <section className="py-32 px-6 bg-gradient-to-b from-black via-blue-950/5 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                AI-Powered Creative Tools
              </h2>
              <p className="text-white/50 text-lg">Three powerful tools, one platform</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {[
                { icon: Wand2, title: "Text to Image", desc: "Create photorealistic images from simple descriptions using Google Imagen", color: "blue", features: ["HD quality outputs", "Multiple styles", "Instant generation"], image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format&fit=crop&q=80" },
                { icon: Video, title: "Text to Video", desc: "Generate cinematic videos from text prompts with advanced AI models", color: "purple", features: ["5-second clips", "Cinematic quality", "Motion control"], image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80" },
                { icon: Mic, title: "Text to Speech", desc: "Convert text to natural-sounding speech with ElevenLabs voices", color: "green", features: ["Human-like voices", "Multiple languages", "Studio quality"], image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&auto=format&fit=crop&q=80" },
                { icon: Sparkles, title: "Voice Changer", desc: "Transform any audio into a different voice while preserving emotion", color: "yellow", features: ["Speech-to-Speech", "Emotion preservation", "Audio upload"], image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&auto=format&fit=crop&q=80" },
                { icon: Users, title: "Voice Cloning", desc: "Create a digital replica of your voice from audio samples", color: "pink", features: ["Instant cloning", "Custom voice ID", "Secure & Private"], image: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=800&auto=format&fit=crop&q=80" }
              ].map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                >
                  <Card className="group relative overflow-hidden border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-primary/50 transition-all h-full">
                    <div className="absolute inset-0 opacity-10">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50" />

                    <CardHeader className="relative">
                      <div className={`w-16 h-16 bg-${service.color}-500/20 rounded-2xl flex items-center justify-center text-${service.color}-400 mb-4 group-hover:scale-110 transition-transform backdrop-blur-sm`}>
                        <service.icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-white">{service.title}</CardTitle>
                      <CardDescription className="text-white/50">{service.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <ul className="space-y-2 text-sm text-white/60">
                        {service.features.map(f => <li key={f}>• {f}</li>)}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-32 px-6 bg-gradient-to-b from-black via-purple-950/5 to-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Why Choose Inferance AI?
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "Save Time & Money", desc: "Generate content in seconds that would take hours to create manually" },
                    { title: "Professional Quality", desc: "Powered by Google's latest AI models for exceptional results" },
                    { title: "Scale Effortlessly", desc: "From individual creators to enterprise teams, we scale with you" }
                  ].map((benefit, idx) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2, duration: 0.5 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-white">{benefit.title}</h3>
                        <p className="text-white/50">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80"
                    alt="Benefits"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 px-6 bg-black relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </h2>
              <p className="text-white/50 text-lg">Choose the plan that fits your needs</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                >
                  <Card className={`relative overflow-hidden border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-sm ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/30 scale-105 ring-1 ring-primary/20' : 'hover:border-white/20'} transition-all duration-300`}>
                    {plan.popular && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl -z-10" />
                    )}
                    <CardHeader className="relative">
                      {plan.popular && (
                        <div className="absolute -top-3 right-6 px-4 py-1.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white rounded-full text-xs font-bold shadow-lg">
                          MOST POPULAR
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-6 mt-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.popular ? 'bg-gradient-to-br from-primary/20 to-purple-500/20' : 'bg-white/5'}`}>
                          <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-primary' : 'text-white/60'}`} />
                        </div>
                        <div>
                          <span className="font-bold uppercase tracking-wider text-xs text-white/60">{plan.name}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <CardTitle className="text-5xl font-bold text-white mb-2">
                          {plan.price}
                          <span className="text-xl text-white/40 font-normal">/mo</span>
                        </CardTitle>
                        <CardDescription className="text-white/60 text-base">{plan.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-white/80">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-green-400" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-6">
                      <Link href="/login" className="w-full">
                        <Button
                          className={`w-full h-11 font-semibold transition-all ${plan.popular
                            ? 'bg-white text-black hover:bg-gray-300 shadow-lg'
                            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-32 px-6 bg-black relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Loved by Creators
              </h2>
              <p className="text-white/50 text-lg">See what our users have to say</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                >
                  <Card className="border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-primary/30 transition-all h-full">
                    <CardHeader>
                      <Quote className="w-8 h-8 text-primary/50 mb-4" />
                      <CardDescription className="text-white/70 text-base leading-relaxed">
                        "{testimonial.content}"
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                      />
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-white/50">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-32 px-6 bg-black relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-white/50 text-lg">Everything you need to know</p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="border border-white/5 rounded-lg bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-semibold text-white">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-4 text-white/50"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog */}
        <section className="py-32 px-6 bg-black relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Latest from Our Blog
              </h2>
              <p className="text-white/50 text-lg">Insights, tutorials, and updates</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, idx) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                >
                  <Card className="border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-primary/50 transition-all cursor-pointer group h-full overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-4 text-xs text-white/50 mb-2">
                        <span className="px-2 py-1 bg-primary/20 text-primary rounded">{post.category}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                      </div>
                      <CardTitle className="text-white group-hover:text-primary transition-colors">{post.title}</CardTitle>
                      <CardDescription className="text-white/50">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="ghost" className="text-primary hover:bg-primary/10">
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-32 px-6 bg-black relative z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 -z-10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of creators bringing their ideas to life with AI
            </p>
            <Link href="/login">
              <Button size="lg" className="h-14 px-10 text-lg bg-white text-black hover:bg-gray-300 font-semibold shadow-2xl shadow-white/20">
                Start Creating Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-auto px-6 py-16 border-t border-white/5 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 font-bold text-xl mb-4">
                  <img src="/logo.svg" alt="Inference AI Logo" className="w-8 h-8" />
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Inference AI
                  </span>
                </div>
                <p className="text-white/50 mb-6 max-w-xs">
                  The next generation AI platform for creators, marketers, and innovators.
                </p>
                <div className="flex items-center gap-4">
                  <Github className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white">Product</h3>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white">Company</h3>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
              <p>© 2026 Inference AI. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>

            {/* Massive Brand Footer Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mt-20 pt-10 border-t border-white/5 select-none"
            >
              <h1 className="text-[12vw] font-black leading-none tracking-tight md:tracking-[10px] text-center bg-gradient-to-b from-white via-white/50 to-transparent bg-clip-text text-transparent uppercase opacity-20 hover:opacity-100 transition-opacity duration-700 whitespace-nowrap">
                INFERENCE AI
              </h1>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  )
}
