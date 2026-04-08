export interface Resource {
  id: number;
  slug: string;
  title: string;
  titleAm?: string;
  content: string[];
  readTime: string;
  published: string;
  author: string;
  pdfUrl?: string;
}

export const resourceData: Resource[] = [
  {
    id: 1,
    slug: "dairy-farming-guide",
    title: "Complete Guide to Dairy Farming in Ethiopia",
    titleAm: "የኢትዮጵያ የወተት ግብዓት ሙሉ መመሪያ",
    content: [
      "Introduction to Ethiopian dairy farming",
      "Best practices for cow health",
      "Milking hygiene procedures",
      "Feed management for higher yield",
      "Disease prevention and treatment",
      "Working with Holland Dairy"
    ],
    readTime: "8 min",
    published: "10/2/2019",
    author: "Holland Dairy Expert",
    pdfUrl: "/pdfs/dairy-farming-guide.pdf"
  },
  {
    id: 2,
    slug: "dutch-technology-processing",
    title: "Dutch Technology in Ethiopian Dairy Processing",
    titleAm: "የደች ቴክኖሎጂ በኢትዮጵያ የወተት ማምረት",
    content: [
      "Overview of Dutch dairy technology",
      "Pasteurization process explained",
      "Homogenization techniques",
      "Quality control systems",
      "Cold storage technology ($2M facility)",
      "Wastewater treatment"
    ],
    readTime: "10 min",
    published: "15/3/2019",
    author: "Holland Dairy Processing Team",
    pdfUrl: "/pdfs/dutch-technology-processing.pdf"
  },
  {
    id: 3,
    slug: "nutrition-health-benefits",
    title: "Nutrition & Health Benefits of Fresh Dairy",
    titleAm: "የእርጎ የመመገቢያና የጤና ጥቅሞች",
    content: [
      "Nutritional profile of yoghurt",
      "Probiotics and gut health",
      "Calcium for strong bones",
      "Protein for muscle health",
      "Dairy in Ethiopian diet",
      "Recommended daily intake"
    ],
    readTime: "6 min",
    published: "20/4/2019",
    author: "Holland Dairy Nutritionist",
    pdfUrl: "/pdfs/nutrition-health-benefits.pdf"
  }
];