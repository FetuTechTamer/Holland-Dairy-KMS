// src/components/product/ProductDetailClient.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { MoveLeft, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import { Product } from "@/lib/productData";
import Navbar from "@/components/Navbar";

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { language } = useLanguage();
    const t = translations[language];

    const name = language === "am" ? product.nameAm || product.name : product.name;
    const description = language === "am" ? product.descriptionAm || product.description : product.description;
    const ingredients = language === "am" ? product.ingredientsAm || product.ingredients : product.ingredients;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-300">
                <div className="container mx-auto px-6 max-w-5xl">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:underline">
                        {t.common?.backToProducts || "Back to Products"}
                    </Link>

                    <div className="grid md:grid-cols-2 gap-16 mb-16">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-auto">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold">{name}</h1>

                            <div className="flex items-center gap-2">
                                <Star className="text-yellow-400 w-5 h-5 fill-current" />
                                <span className="font-bold">{product.rating}</span>
                                <span className="opacity-60">({product.reviewCount}+ reviews)</span>
                            </div>

                            <div className="text-2xl font-bold text-accent">{product.price}</div>

                            <div>
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">📖 {language === "am" ? "መግለጫ" : "DESCRIPTION"}</h3>
                                <p className="opacity-80 leading-relaxed">{description}</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">🥛 {language === "am" ? "ግብዓቶችና የተመጣጠነ ምግብ" : "INGREDIENTS & NUTRITION"}</h3>
                                <p className="opacity-80 leading-relaxed mb-4">{ingredients}</p>

                                {product.nutrition && (
                                    <div className="bg-primary/5 p-4 rounded-xl">
                                        <table className="w-full text-left">
                                            <tbody>
                                                {Object.entries(product.nutrition).map(([key, value]) => (
                                                    <tr key={key} className="border-b border-primary/10 last:border-0">
                                                        <td className="py-2 capitalize font-medium">{key}</td>
                                                        <td className="py-2 text-right opacity-80">{value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Staff/Admin section */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="glass p-8 rounded-3xl border border-primary/10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                                🏭 PRODUCTION DETAILS <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full uppercase ml-auto">Staff/Admin</span>
                            </h3>
                            <ul className="space-y-3 opacity-80">
                                <li><span className="font-semibold">Batch Size:</span> {product.productionBatch}</li>
                                <li><span className="font-semibold">Fermentation:</span> {product.fermentationTime}</li>
                                {product.fruitAmount && <li><span className="font-semibold">Fruit Amount:</span> {product.fruitAmount}</li>}
                                {product.shelfLife && <li><span className="font-semibold">Shelf Life:</span> {product.shelfLife}</li>}
                            </ul>
                        </div>

                        <div className="glass p-8 rounded-3xl border border-primary/10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                                📋 QUALITY SPECIFICATIONS <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full uppercase ml-auto">Staff/Admin</span>
                            </h3>
                            <ul className="space-y-3 opacity-80">
                                {product.fatContent && <li><span className="font-semibold">Fat Content:</span> {product.fatContent}</li>}
                                {product.phLevel && <li><span className="font-semibold">pH Level:</span> {product.phLevel}</li>}
                                <li><span className="font-semibold">HACCP:</span> Certified</li>
                                <li><span className="font-semibold">ISO:</span> 9001:2015 Compliant</li>
                            </ul>
                        </div>
                    </div>

                    <ProductReviews language={language} />
                    <RelatedProducts currentProductId={product.id} language={language} />
                </div>
            </main>
        </>
    );
}