'use client';

import Image from "next/image";
import Navbar from "@/components/Navbar";
import KnowledgeCards from "@/components/KnowledgeCards";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { MoveRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-fixed z-0 dark:opacity-40 transition-opacity" />
        <div className="absolute inset-0 bg-background/20 dark:bg-black/60 z-10" />

        <div className="relative z-20 text-center px-6 max-w-4xl animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl">
            {t.hero.title} <br />
            <span className="text-accent">{t.hero.subtitle}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 leading-relaxed font-light opacity-90">
            {t.hero.description}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#resources"
              className="bg-primary text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-2xl"
            >
              {t.hero.browse} <MoveRight className="w-5 h-5" />
            </a>
            <a
              href="#about"
              className="glass text-foreground px-10 py-4 rounded-full text-lg font-bold hover:bg-foreground/5 transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              {t.hero.story}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl group-hover:bg-accent/30 transition-all" />
            <Image
              src="/holland-about.jpg"
              alt="Milk pouring"
              width={600}
              height={800}
              className="relative rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="space-y-8">
            <div className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full font-bold text-sm tracking-wider uppercase">
              {t.about.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {t.about.title1} <br />
              <span className="text-accent">{t.about.title2}</span>
            </h2>
            <p className="text-lg opacity-80 leading-relaxed">
              {t.about.description}
            </p>
            <ul className="space-y-4">
              {t.about.features.map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="text-accent w-6 h-6 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Product Spotlight */}
      <section id="products" className="py-24 bg-brand-dark-gray text-white relative px-6 dark:bg-black/40">
        <div className="max-w-6xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">{t.products.title}</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto italic">
            {t.products.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Natural Yoghurt */}
          <div className="glass group rounded-[40px] overflow-hidden p-8 hover:bg-white/10 transition-all border-white/5">
            <div className="relative mb-8 rounded-3xl overflow-hidden h-64">
              <Image
                src="/holland-natural.jpg"
                alt="Natural Yoghurt"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">{t.products.natural.name}</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              {t.products.natural.desc}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-accent font-bold text-xl">{t.products.natural.label}</span>
              <button className="text-white flex items-center gap-2 group/btn font-bold">
                {t.products.details} <MoveRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          {/* Strawberry Yoghurt */}
          <div className="glass group rounded-[40px] overflow-hidden p-8 hover:bg-white/10 transition-all border-white/5">
            <div className="relative mb-8 rounded-3xl overflow-hidden h-64">
              <Image
                src="/holland-strawberry.jpg"
                alt="Strawberry Yoghurt"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">{t.products.strawberry.name}</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              {t.products.strawberry.desc}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-red-400 font-bold text-xl">{t.products.strawberry.label}</span>
              <button className="text-white flex items-center gap-2 group/btn font-bold">
                {t.products.details} <MoveRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          {/* mango Yoghurt */}
          <div className="glass group rounded-[40px] overflow-hidden p-8 hover:bg-white/10 transition-all border-white/5">
            <div className="relative mb-8 rounded-3xl overflow-hidden h-64">
              <Image
                src="/holland-mango.jpg"
                alt="Strawberry Yoghurt"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">{t.products.strawberry.name}</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              {t.products.strawberry.desc}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-red-400 font-bold text-xl">{t.products.strawberry.label}</span>
              <button className="text-white flex items-center gap-2 group/btn font-bold">
                {t.products.details} <MoveRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          {/* banana Yoghurt */}
          <div className="glass group rounded-[40px] overflow-hidden p-8 hover:bg-white/10 transition-all border-white/5">
            <div className="relative mb-8 rounded-3xl overflow-hidden h-64">
              <Image
                src="/holland-strawberry.jpg"
                alt="Strawberry Yoghurt"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">{t.products.strawberry.name}</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              {t.products.strawberry.desc}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-red-400 font-bold text-xl">{t.products.strawberry.label}</span>
              <button className="text-white flex items-center gap-2 group/btn font-bold">
                {t.products.details} <MoveRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-32 bg-background">
        <div className="max-w-6xl mx-auto text-center mb-20 space-y-4 px-6">
          <div className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full font-bold text-sm tracking-wider uppercase">
            {t.resources.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">{t.resources.title}</h2>
          <p className="opacity-60 text-lg max-w-2xl mx-auto italic">
            {t.resources.description}
          </p>
        </div>
        <KnowledgeCards />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 relative bg-background/50">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="max-w-4xl mx-auto text-center mb-16 px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t.faq.title}</h2>
          <p className="text-lg opacity-60">{t.faq.description}</p>
        </div>
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}
