import React from 'react';
import LegacyStories from '@/components/staff/LegacyStories';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
    title: 'Lessons Learned | Holland Dairy',
    description: 'Wisdom and lessons from experienced staff at Holland Dairy',
};

export default function LegacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent -z-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <Breadcrumb />
                <div className="mt-8 relative z-10 glass p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
                    <LegacyStories />
                </div>
            </div>
        </main>
    );
}
