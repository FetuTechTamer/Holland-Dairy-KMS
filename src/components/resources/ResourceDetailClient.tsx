'use client';

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { MoveLeft, ThumbsUp, ThumbsDown, Share2, Printer } from "lucide-react";
import ResourceContent from "./ResourceContent";
import { Resource } from "@/lib/resourceData";

interface ResourceDetailClientProps {
    resource: Resource;
}

export default function ResourceDetailClient({ resource }: ResourceDetailClientProps) {
    const { language } = useLanguage();
    const t = translations[language];

    const title = language === "am" ? resource.titleAm || resource.title : resource.title;

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-300">
                <div className="container mx-auto px-6 max-w-5xl">
                    <Link
                        href="/#resources"
                        className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:underline"
                    >
                        {t.common?.backToResources || "Back to Resources"}
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">{title}</h1>

                    <div className="glass p-8 md:p-12 rounded-3xl border border-primary/5 shadow-lg mb-12">
                        {/* Article metadata */}
                        <div className="flex flex-wrap items-center gap-6 text-sm opacity-70 mb-10 pb-6 border-b border-border">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{resource.published} (EC)</span>
                            <span>⏱️ {resource.readTime} read time</span>
                            <span>✍️ {resource.author}</span>
                        </div>

                        {/* Resource content */}
                        <ResourceContent resource={resource} translations={t} />
                    </div>

                    {/* Feedback section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border pt-8">
                        <div className="flex items-center gap-4">
                            <span className="font-medium">{t.common?.helpful || "Was this helpful?"}</span>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors font-medium text-primary">
                                <ThumbsUp className="w-4 h-4" /> {t.common?.yes || "Yes"}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors font-medium text-red-600">
                                <ThumbsDown className="w-4 h-4" /> {t.common?.no || "No"}
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-primary transition-all">
                                <Share2 className="w-4 h-4" /> {t.common?.share || "Share"}
                            </button>
                            <button className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-primary transition-all">
                                <Printer className="w-4 h-4" /> {t.common?.print || "Print"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}