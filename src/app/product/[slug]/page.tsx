// src/app/product/[slug]/page.tsx
import { productData } from "@/lib/productData";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/product/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  // Unwrap async params
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Find product
  const product = productData.find((p) => p.slug === slug);
  if (!product) notFound();

  // Pass product to client component for rendering
  return <ProductDetailClient product={product} />;
}