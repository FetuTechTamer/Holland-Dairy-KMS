import { productData } from "@/lib/productData";
import Image from "next/image";
import Link from "next/link";

interface RelatedProductsProps {
  currentProductId: number;
  language: "en" | "am";
}

export default function RelatedProducts({ currentProductId, language }: RelatedProductsProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">🔗 {language === "am" ? "ተዛማጅ ምርቶች" : "RELATED PRODUCTS"}</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {productData.filter(p => p.id !== currentProductId).slice(0, 3).map(p => (
          <Link href={`/product/${p.slug}`} key={p.id}>
            <div className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-48">
                <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h4 className="font-bold mb-1">{language === "am" ? p.nameAm || p.name : p.name}</h4>
                <span className="text-accent font-bold">{p.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
