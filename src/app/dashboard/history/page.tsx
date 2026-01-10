"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Image as ImageIcon, Video, Mic, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const generations = [
    {
        id: "1",
        type: "image",
        prompt: "A neon cyberpunk street on a rainy night",
        status: "completed",
        created_at: "2024-03-20 14:30",
        url: "#"
    },
    {
        id: "2",
        type: "video",
        prompt: "Camera panning over a lush green forest",
        status: "completed",
        created_at: "2024-03-19 11:20",
        url: "#"
    },
    {
        id: "3",
        type: "tts",
        prompt: "Welcome to the future of AI generation",
        status: "completed",
        created_at: "2024-03-18 09:45",
        url: "#"
    },
]

export default function HistoryPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Generation History</h2>
                <p className="text-muted-foreground">
                    View and manage your previous AI generations.
                </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Prompt</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {generations.map((gen) => (
                            <TableRow key={gen.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {gen.type === 'image' && <ImageIcon className="w-4 h-4" />}
                                        {gen.type === 'video' && <Video className="w-4 h-4" />}
                                        {gen.type === 'tts' && <Mic className="w-4 h-4" />}
                                        <span className="capitalize">{gen.type}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-[300px] truncate">
                                    {gen.prompt}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                        {gen.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                    {gen.created_at}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
