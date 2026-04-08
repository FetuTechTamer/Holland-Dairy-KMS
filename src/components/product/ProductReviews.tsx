
import { Star } from "lucide-react";

interface ProductReviewsProps {
  language: "en" | "am";
}

export default function ProductReviews({ language }: ProductReviewsProps) {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6">💬 {language === "am" ? "የደንበኞች አስተያየት" : "CUSTOMER REVIEWS"}</h3>
      {/* Mock reviews */}
      <div className="glass p-6 rounded-2xl mb-4 border border-primary/5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold">Abebe B.</span>
          <div className="flex text-yellow-400">
            <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
          </div>
        </div>
        <p className="opacity-80">Absolutely delicious! The whole family loves it.</p>
      </div>

      <div className="mt-8 bg-background p-6 rounded-2xl border border-primary/10">
        <h4 className="font-bold mb-4">{language === "am" ? "አስተያየት ይጻፉ" : "Write a review"}</h4>
        <textarea
          className="w-full p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none min-h-[100px] mb-4"
          placeholder={language === "am" ? "የእርስዎ አስተያየት..." : "Your review..."}
        ></textarea>
        <button className="bg-primary text-white px-6 py-2 rounded-full font-bold">
          {language === "am" ? "አስተያየት ያስገቡ" : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
