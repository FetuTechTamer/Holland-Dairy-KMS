// src/lib/productData.ts

export interface Product {
  id: number;
  slug: string;
  name: string;
  nameAm?: string;
  image: string;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  descriptionAm?: string;
  ingredients?: string;
  ingredientsAm?: string;
  nutrition?: Record<string, number>; // calories, protein, fat, carbs, calcium
  productionBatch?: string;
  fermentationTime?: string;
  shelfLife?: string;
  fruitAmount?: string;
  fatContent?: string;
  phLevel?: string;
}

export const productData: Product[] = [
  {
    id: 1,
    slug: "natural-yoghurt",
    name: "Natural Yoghurt",
    nameAm: "ተፈጥሯዊ እርጎ",
    image: "/holland-natural.jpg",
    price: "80 ETB / 500g",
    rating: 4.8,
    reviewCount: 124,
    description:
      "Our classic natural yoghurt is made from 100% fresh Ethiopian milk using Dutch technology. Creamy, rich, and packed with probiotics for gut health. No artificial preservatives or additives.",
    descriptionAm:
      "የእኛ ክላሲክ ተፈጥሯዊ እርጎ የተሰራው ከ100% ትኩስ የኢትዮጵያ ወተት በደች ቴክኖሎጂ ነው። ለስላሳ፣ ሀብታም እና ለአንጀት ጤና ጠቃሚ በሆኑ ፕሮባዮቲኮች የተሞላ ነው። ምንም አይነት ሰው ሰራሽ ተጨማሪዎች የሉትም።",
    ingredients:
      "Fresh whole milk, starter culture (Lactobacillus bulgaricus, Streptococcus thermophilus)",
    ingredientsAm:
      "ትኩስ ሙሉ ወተት፣ ማነሻ ባክቴሪያ (ላክቶባሲለስ ቡልጋሪከስ፣ ስትሬፕቶኮከስ ተርሞፊለስ)",
    nutrition: { calories: 98, protein: 3.5, fat: 3.2, carbs: 14, calcium: 120 },
    productionBatch: "1,000 liters",
    fermentationTime: "6 hours at 42°C",
    shelfLife: "21 days",
    fatContent: "3.5%",
    phLevel: "4.2 - 4.5"
  },
  {
    id: 2,
    slug: "strawberry-yoghurt",
    name: "Strawberry Yoghurt",
    nameAm: "እንጆሪ እርጎ",
    image: "/holland-strawberry.jpg",
    price: "95 ETB / 500g",
    rating: 4.9,
    reviewCount: 203,
    description:
      "Made with REAL Ethiopian strawberries! We source the freshest strawberries from local farms and blend them into our creamy yoghurt base. Bursting with natural fruit flavor.",
    descriptionAm:
      "በእውነተኛ የኢትዮጵያ እንጆሪ የተሰራ! ትኩስ እንጆሪዎችን ከአካባቢ እርሻዎች እናመጣለን እና ከለስላሳ እርጎአችን ጋር እንቀላቀላለን። በተፈጥሮ ፍራፍሬ ጣዕም የተሞላ።",
    ingredients:
      "Fresh milk, starter culture, fresh strawberries (15%), sugar, natural pectin",
    ingredientsAm:
      "ትኩስ ወተት፣ ማነሻ ባክቴሪያ፣ ትኩስ እንጆሪ (15%)፣ ስኳር፣ ተፈጥሯዊ ፔክቲን",
    nutrition: { calories: 112, protein: 3.2, fat: 3.0, carbs: 18, calcium: 110 },
    productionBatch: "1,000 liters",
    fermentationTime: "6 hours at 42°C",
    fruitAmount: "120 kg fresh strawberries"
  },
  {
    id: 3,
    slug: "mango-yoghurt",
    name: "Mango Yoghurt",
    nameAm: "ማንጎ እርጎ",
    image: "/holland-mango.jpg",
    price: "95 ETB / 500g",
    rating: 4.7,
    reviewCount: 98,
    description:
      "Tropical mango bliss! We blend ripe Ethiopian mangoes into our signature yoghurt for a sweet, tangy, and refreshing taste. A customer favorite during mango season.",
    descriptionAm:
      "ትሮፒካል ማንጎ ደስታ! የበሰለ የኢትዮጵያ ማንጎዎችን በልዩ እርጎአችን ውስጥ እንቀላቀላለን ጣፋጭ፣ መራራ እና መጠጥ ጣዕም ለማግኘት። በማንጎ ወቅት የደንበኛ ተወዳጅ።",
    ingredients: "Fresh milk, starter culture, mango puree (15%), sugar, natural pectin",
    productionBatch: "1,000 liters",
    fruitAmount: "120 kg mango puree"
  },
  {
    id: 4,
    slug: "banana-yoghurt",
    name: "Banana Yoghurt",
    nameAm: "ሙዝ እርጎ",
    image: "/holland-strawberry.jpg", // fixed image
    price: "90 ETB / 500g",
    rating: 4.6,
    reviewCount: 78,
    description:
      "Sweet and creamy banana yoghurt! Made with real Ethiopian bananas, this smooth and satisfying yoghurt is perfect for breakfast or a healthy snack.",
    descriptionAm:
      "ጣፋጭ እና ለስላሳ ሙዝ እርጎ! ከእውነተኛ የኢትዮጵያ ሙዝ የተሰራ፣ ይህ ለስላሳ እና አጥጋቢ እርጎ ለቁርስ ወይም ለጤናማ መክሰስ ፍጹም ነው።",
    ingredients: "Fresh milk, starter culture, banana puree (15%), sugar, natural pectin",
    productionBatch: "1,000 liters",
    fruitAmount: "120 kg banana puree"
  }
];