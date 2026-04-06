export type Role = 'FARMER' | 'STAFF' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  joinDate: string;
  avatar?: string;
  department?: string;
  farmName?: string;
  location?: string;
  cowCount?: number;
  avgDailyLiters?: number;
}

export interface Article {
  id: string;
  title: string;
  titleAm?: string;
  excerpt: string;
  excerptAm?: string;
  content: string;
  category: string;
  role: Role | 'BOTH';
  readTime: string;
  image: string;
  date: string;
  author: string;
}

export interface TutorialVideo {
  id: string;
  title: string;
  titleAm?: string;
  thumbnail: string;
  duration: string;
  category: string;
  role: Role | 'BOTH';
  url: string;
  views?: string;
  date: string;
  hasAmharicVoiceover?: boolean;
}

export interface Post {
  id: string;
  authorName: string;
  authorRole: Role;
  content: string;
  contentAm?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  category: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorRole: Role;
  content: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: string;
  timestamp: string;
  updates: TicketUpdate[];
}

export interface TicketUpdate {
  id: string;
  authorName: string;
  content: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'ARTICLE' | 'TICKET' | 'POST' | 'ANNOUNCEMENT';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface MilkRecord {
  id: string;
  farmerId: string;
  date: string; // "DD/MM/YYYY" Ethiopian format
  liters: number;
  quality: 'A' | 'B' | 'C';
  notes?: string;
}

export interface CowHealthRecord {
  id: string;
  farmerId: string;
  date: string;
  cowId: string;
  observation: string;
  status: 'HEALTHY' | 'SICK' | 'RECOVERING';
}

export interface Recipe {
  id: string;
  name: string;
  nameAm?: string;
  batchSizeLiters: number;
  ingredients: { name: string; amount: string; unit: string }[];
  steps: string[];
  category: string;
  version: string;
  lastUpdated: string; // Ethiopian format
  author: string;
}

export interface QCRecord {
  id: string;
  date: string; // Ethiopian format
  batchId: string;
  fat: number;
  protein: number;
  bacteria: number;
  pH: number;
  temperature: number;
  status: 'PASS' | 'FAIL' | 'WARNING';
  inspector: string;
}

export interface MaintenanceLog {
  id: string;
  equipment: string;
  lastService: string; // Ethiopian format
  nextService: string; // Ethiopian format
  status: 'OK' | 'DUE' | 'OVERDUE';
  technician: string;
  notes: string;
}

export interface SMSAlert {
  id: string;
  date: string; // Ethiopian format
  message: string;
  messageAm: string;
  type: 'COLLECTION' | 'WEATHER' | 'DISEASE' | 'PRICE' | 'EVENT';
}

export interface PaymentRecord {
  id: string;
  farmerId: string;
  date: string; // Ethiopian format
  liters: number;
  pricePerLiter: number;
  total: number;
  status: 'PAID' | 'PENDING';
}

// ================================================================
// USERS
// ================================================================
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@holland.com',
    role: 'ADMIN',
    joinDate: '2023-01-01',
    department: 'Management',
  },
  {
    id: '2',
    name: 'Abebe Bikila',
    email: 'farmer@holland.com',
    role: 'FARMER',
    joinDate: '2023-05-12',
    farmName: 'Bishoftu Green Farm',
    location: 'Bishoftu, Oromia',
    cowCount: 12,
    avgDailyLiters: 85,
  },
  {
    id: '3',
    name: 'Sara Selassie',
    email: 'staff@holland.com',
    role: 'STAFF',
    joinDate: '2023-03-20',
    department: 'Quality Control',
  },
  {
    id: '4',
    name: 'Kebede Molla',
    email: 'kebede@holland.com',
    role: 'FARMER',
    joinDate: '2023-06-01',
    farmName: 'Molla Dairy Farm',
    location: 'Bishoftu, Oromia',
    cowCount: 8,
    avgDailyLiters: 55,
  },
  {
    id: '5',
    name: 'Tigist Haile',
    email: 'tigist@holland.com',
    role: 'FARMER',
    joinDate: '2023-07-14',
    farmName: 'Haile Family Farm',
    location: 'Ada, Oromia',
    cowCount: 15,
    avgDailyLiters: 110,
  },
  {
    id: '6',
    name: 'Yohannes Tesfaye',
    email: 'yohannes@holland.com',
    role: 'FARMER',
    joinDate: '2023-08-20',
    farmName: 'Tesfaye Milk Co.',
    location: 'Bishoftu, Oromia',
    cowCount: 6,
    avgDailyLiters: 42,
  },
  {
    id: '7',
    name: 'Almaz Worku',
    email: 'almaz@holland.com',
    role: 'FARMER',
    joinDate: '2023-09-05',
    farmName: 'Worku Green Hills',
    location: 'Debre Zeit, Oromia',
    cowCount: 20,
    avgDailyLiters: 150,
  },
  {
    id: '8',
    name: 'Daniel Mekonnen',
    email: 'daniel@holland.com',
    role: 'STAFF',
    joinDate: '2023-02-15',
    department: 'Production',
  },
  {
    id: '9',
    name: 'Hiwot Girma',
    email: 'hiwot@holland.com',
    role: 'STAFF',
    joinDate: '2023-04-10',
    department: 'Maintenance',
  },
];

// ================================================================
// ARTICLES (25+ across 11 categories)
// ================================================================
export const allArticles: Article[] = [
  // CAT 1: PRODUCTION & PROCESSING (Staff/Admin)
  {
    id: '1-1',
    title: 'Standardized Production Workflows',
    titleAm: 'መደበኛ የምርት ሥርዓቶች',
    excerpt: 'End-to-end process maps for consistent dairy production.',
    excerptAm: 'ለተሳካ የወተት ምርት ሙሉ የሂደት ካርታዎች።',
    content: 'Full workflow documentation starting from milk reception to final packaging. Each stage has clearly defined checkpoints and quality gates to ensure consistency across all batches.',
    category: 'cat1',
    role: 'STAFF',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1200?auto=format&fit=crop&q=80&w=800',
    date: '2025-06-10',
    author: 'Production Team',
  },
  {
    id: '1-2',
    title: 'CIP Procedures for Hygiene',
    titleAm: 'የንፅህና ማጽጃ ሂደቶች',
    excerpt: 'Cleaning-in-place standards for factory maintenance.',
    excerptAm: 'ለፋብሪካ ጥገና ተደጋጋሚ ጽዳት ደረጃዎች።',
    content: 'Step-by-step cleaning protocols to ensure zero contamination across all processing equipment. Frequency, chemical concentrations, and verification steps are all included.',
    category: 'cat1',
    role: 'STAFF',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1536531327116-2e457f9037be?auto=format&fit=crop&q=80&w=800',
    date: '2025-06-15',
    author: 'Hygiene Dept',
  },
  {
    id: '1-3',
    title: 'Batch Tracking & Traceability',
    titleAm: 'የምርት ባቹ ክትትል',
    excerpt: 'Track every batch from raw milk to final product.',
    excerptAm: 'ከጥሬ ወተት እስከ ምርት ድረስ እያንዳንዱ ባቹ ይከታተሉ።',
    content: 'Our batch tracking system assigns a unique ID to every production run, enabling full traceability for recalls and quality audits.',
    category: 'cat1',
    role: 'STAFF',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    date: '2025-07-02',
    author: 'Production Lead',
  },

  // CAT 2: QUALITY, SAFETY & COMPLIANCE
  {
    id: '2-1',
    title: 'HACCP Standards Overview',
    titleAm: 'የHACCP ደረጃዎች መመሪያ',
    excerpt: 'Critical control points for food safety in dairy.',
    excerptAm: 'በወተት ምርት ውስጥ ለምግብ ደህንነት ወሳኝ የቁጥጥር ነጥቦች።',
    content: 'Identifying and managing risks at every stage of the production cycle. Includes temperature control, sanitation, and supplier verification.',
    category: 'cat2',
    role: 'STAFF',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1579165466531-39665752e811?auto=format&fit=crop&q=80&w=800',
    date: '2025-07-01',
    author: 'QC Manager',
  },
  {
    id: '2-2',
    title: 'ISO 22000 Audit Checklist',
    titleAm: 'ISO 22000 የኦዲት ዝርዝር',
    excerpt: 'Preparation guide for internal and external inspections.',
    excerptAm: 'ለውስጥ እና ውጭ ኦዲቶች ዝግጅት መሪ።',
    content: 'Document requirements and site inspection standards for ISO 22000 compliance. Updated for the current certification cycle.',
    category: 'cat2',
    role: 'STAFF',
    readTime: '20 min',
    image: 'https://images.unsplash.com/photo-1582719471327-593256093481?auto=format&fit=crop&q=80&w=800',
    date: '2025-07-10',
    author: 'Compliance Lead',
  },

  // CAT 3: SUPPLY CHAIN (Staff write, Farmer read)
  {
    id: '3-1',
    title: 'Milk Collection Center Best Practices',
    titleAm: 'የወተት መሰብሰቢያ ማዕከል ምርጥ ልምዶች',
    excerpt: 'Training program for efficient milk quality improvement.',
    excerptAm: 'ለወተት ጥራት ማሻሻል ሥልጠና ፕሮግራም።',
    content: 'Guidelines for managing milk collection centers, including cooling protocols, hygienic containers, and rapid testing procedures.',
    category: 'cat3',
    role: 'BOTH',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=800',
    date: '2025-01-15',
    author: 'Logistics Team',
  },
  {
    id: '3-2',
    title: 'Seasonal Supply Variation Strategies',
    titleAm: 'ወቅታዊ የወተት አቅርቦት ልዩነት ስልቶች',
    excerpt: 'Managing milk supply fluctuations throughout the year.',
    excerptAm: 'ዓመቱን ሙሉ የወተት አቅርቦት መዋዠቅን ማስተዳደር።',
    content: 'Analyzing seasonal patterns and implementing buffer strategies for consistent production during dry season shortfalls.',
    category: 'cat3',
    role: 'STAFF',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1586528116311-ad86df6283b4?auto=format&fit=crop&q=80&w=800',
    date: '2025-02-20',
    author: 'Supply Lead',
  },
  {
    id: '3-3',
    title: 'Payment Schedules & Milk Pricing',
    titleAm: 'የክፍያ ሰንጠረዥ እና የወተት ዋጋ',
    excerpt: 'Current milk prices and collection payment dates.',
    excerptAm: 'አሁናዊ የወተት ዋጋዎች እና የሰብሳቢ ክፍያ ቀናቶች።',
    content: 'Holland Dairy pays farmers bi-monthly. Current rate: 22 ETB/liter for Grade A, 18 ETB for Grade B. Payments on 1st and 15th of each Ethiopian month.',
    category: 'cat3',
    role: 'BOTH',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    date: '2025-09-01',
    author: 'Finance Dept',
  },

  // CAT 4: MARKET, SALES
  {
    id: '4-1',
    title: 'Regional Demand Differences',
    titleAm: 'የክልላዊ ፍላጎት ልዩነቶች',
    excerpt: 'Insights into urban vs rural dairy markets in Ethiopia.',
    excerptAm: 'በከተማ እና በገጠር ዳይሪ ገበያዎች ላይ መረጃ።',
    content: 'Comparison of consumption habits in urban centers vs regional towns. Addis Ababa accounts for 62% of premium yoghurt sales.',
    category: 'cat4',
    role: 'STAFF',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    date: '2025-03-05',
    author: 'Market Research',
  },
  {
    id: '4-2',
    title: 'Promotional Campaign Effectiveness',
    titleAm: 'የማስተዋወቂያ ዘመቻ ውጤታማነት',
    excerpt: 'Analyzing the impact of recent brand positioning.',
    excerptAm: 'ቅርብ ጊዜ የምርት ዓላማ ቦታ ቅኝት ተፅዕኖ ትንታኔ።',
    content: 'Performance metrics for social media vs traditional media campaigns. Radio in Amharic achieved 3x higher farmer awareness.',
    category: 'cat4',
    role: 'STAFF',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    date: '2025-03-15',
    author: 'Marketing Dept',
  },

  // CAT 5: FINANCIAL (Admin only)
  {
    id: '5-1',
    title: 'Profit Margins Per Product Line',
    titleAm: 'በምርት መስመር የትርፍ ህዳጎች',
    excerpt: 'Breakdown: Natural Yoghurt vs Strawberry vs Milk.',
    excerptAm: 'ተፈጥሮ እርጎ vs እንጆሪ vs ወተት ትርፍ ህዳጎች።',
    content: 'Detailed cost analysis including raw material, electricity, labor, and packaging. Natural yoghurt leads with 34% margin.',
    category: 'cat5',
    role: 'ADMIN',
    readTime: '18 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    date: '2025-04-01',
    author: 'Finance Head',
  },
  {
    id: '5-2',
    title: 'Financial Forecasting – 2019 EC',
    titleAm: 'የ2019 ዓ.ም ፋይናንስ ትንበያ',
    excerpt: 'Projections and investment plan for 2019 Ethiopian fiscal year.',
    excerptAm: 'ለ2019 ዓ.ም ትንበያ እና ኢንቨስትመንት ዕቅድ።',
    content: 'Revenue forecast: 45M ETB. Capital expenditure for cold chain expansion: 8M ETB. Farmer payment budget: 12M ETB.',
    category: 'cat5',
    role: 'ADMIN',
    readTime: '25 min',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800',
    date: '2025-04-10',
    author: 'Strategy Dept',
  },

  // CAT 6: HR & ORGANIZATIONAL
  {
    id: '6-1',
    title: 'Knowledge Transfer Systems',
    titleAm: 'የእውቀት ሽግግር ስርዓቶች',
    excerpt: 'Mentoring and training manuals for new equipment.',
    excerptAm: 'ለአዲስ መሣሪያዎች ምክር እና የሥልጠና ማኑዋሎች።',
    content: 'Framework for ensuring institutional knowledge is preserved and transferred. Includes buddy system and structured handovers.',
    category: 'cat6',
    role: 'STAFF',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    date: '2025-05-01',
    author: 'HR Manager',
  },
  {
    id: '6-2',
    title: 'Health & Safety Training Programs',
    titleAm: 'የጤና እና ደህንነት ሥልጠና ፕሮግራሞች',
    excerpt: 'Mandatory annual safety refreshers for production staff.',
    excerptAm: 'ለምርት ሠራተኞች የዓመት ወቅት ግዴታ ደህንነት ሥልጠና።',
    content: 'New protocols for chemical handling and industrial machine operations. All staff must complete Module 1–4 by month end.',
    category: 'cat6',
    role: 'STAFF',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1504384308090-c89e12076d22?auto=format&fit=crop&q=80&w=800',
    date: '2025-05-12',
    author: 'Safety Office',
  },

  // CAT 7: TECHNOLOGY
  {
    id: '7-1',
    title: 'ERP Integration across Departments',
    titleAm: 'በክፍሎች ያለ ERP ውህደት',
    excerpt: 'Synchronizing production, finance, and logistics data.',
    excerptAm: 'ምርት፣ ፋይናንስ እና ሎጂስቲክስ ዳታ ማስተሳሰር።',
    content: 'Implementing a unified platform for real-time data visibility across all Holland Dairy departments.',
    category: 'cat7',
    role: 'STAFF',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    date: '2025-08-20',
    author: 'IT Dept',
  },
  {
    id: '7-2',
    title: 'Mobile Tools for Field Staff',
    titleAm: 'ለሜዳ ሠራተኞች ሞባይል መሣሪያዎች',
    excerpt: 'Training for logistics and farm visiting teams.',
    excerptAm: 'ለሎጂስቲክስ እና የሜዳ ጉብኝት ቡድኖች ሥልጠና።',
    content: 'Using the new mobile field app for data collection, GPS routing to farms, and offline-first milk record entry.',
    category: 'cat7',
    role: 'STAFF',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
    date: '2025-08-25',
    author: 'Apps Team',
  },

  // CAT 8: R&D (Admin only)
  {
    id: '8-1',
    title: 'Lactose-Free Milk Development',
    titleAm: 'ላቶዝ-ነፃ ወተት ልማት',
    excerpt: 'Developing lactose-free milk for urban health-conscious segments.',
    excerptAm: 'ለከተማ ጤና-ንቁ ክፍሎች ላቶዝ-ነፃ ወተት ማዘጋጀት።',
    content: 'Pilot results from lactase enzyme trials at the Bishoftu plant. Target launch: Yekatit 1, 2019 EC.',
    category: 'cat8',
    role: 'ADMIN',
    readTime: '20 min',
    image: 'https://images.unsplash.com/photo-1628191139360-408306cd953e?auto=format&fit=crop&q=80&w=800',
    date: '2025-09-12',
    author: 'R&D Head',
  },
  {
    id: '8-2',
    title: 'Eco-Friendly Packaging Solutions',
    titleAm: 'የአካባቢ-ወዳጅ የማሸጊያ ፍፃሜዎች',
    excerpt: 'Reducing plastic use in our yoghurt containers.',
    excerptAm: 'በእርጎ መሸጫ ዕቃዎቻችን ፕላስቲክ ብክነትን መቀነስ።',
    content: 'Testing biodegradable sugarcane-pulp cups for 200g yoghurt. Cost neutral at scale >500,000 units/month.',
    category: 'cat8',
    role: 'ADMIN',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1605600611220-b7c6a84844a0?auto=format&fit=crop&q=80&w=800',
    date: '2025-09-20',
    author: 'Sustainability Dept',
  },

  // CAT 9: ENVIRONMENTAL (Farmer read, Staff write)
  {
    id: '9-1',
    title: 'Carbon Footprint Tracking',
    titleAm: 'የካርቦን አሻራ ክትትል',
    excerpt: 'Measuring the environmental impact of dairy operations.',
    excerptAm: 'የወተት ምርት ሥራ አካባቢያዊ ተጽዕኖ መለካት።',
    content: 'Step-by-step guide for monitoring emissions at the Bishoftu factory. Covers energy, transport, feed production, and manure management.',
    category: 'cat9',
    role: 'BOTH',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    date: '2025-10-05',
    author: 'Environmental Office',
  },
  {
    id: '9-2',
    title: 'Animal Welfare Practices',
    titleAm: 'የእንስሳ ደህንነት ልምዶች',
    excerpt: 'Ensuring health and comfort for high-yield herds.',
    excerptAm: 'ለከፍተኛ ምርት ለሚሰጡ ከብቶች ጤና እና ምቾት ማረጋገጥ።',
    content: 'Protocols for housing, nutrition intervals, and veterinary attention for dairy cows. Stress causes a 15% yield drop—prevention matters.',
    category: 'cat9',
    role: 'FARMER',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    date: '2025-10-15',
    author: 'Vet Team',
  },
  {
    id: '9-3',
    title: 'Sustainable Feed & Water Management',
    titleAm: 'ዘላቂ የምግብ እና ውሃ አስተዳደር',
    excerpt: 'Water-efficient farming for Ethiopian smallholders.',
    excerptAm: 'ለኢትዮጵያ አነስተኛ ባለቤቶች ውሃ ቆጣቢ እርሻ።',
    content: 'Rainwater harvesting techniques and clover-based feed mixtures that reduce cost by 18% while maintaining yield.',
    category: 'cat9',
    role: 'FARMER',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    date: '2025-11-01',
    author: 'Agri Extension',
  },

  // CAT 10: RISK MANAGEMENT
  {
    id: '10-1',
    title: 'Supply Disruption Handling',
    titleAm: 'የአቅርቦት መቋረጥ አስተዳደር',
    excerpt: 'Procedures for managing sudden milk shortages.',
    excerptAm: 'ድንገተኛ የወተት ጥበት ለማስተዳደር ሂደቶች።',
    content: 'Activating backup collection routes and managing production priority during drought or rainy-season disruptions.',
    category: 'cat10',
    role: 'STAFF',
    readTime: '14 min',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    date: '2025-11-05',
    author: 'Risk Manager',
  },
  {
    id: '10-2',
    title: 'Product Recall Procedures',
    titleAm: 'የምርት መልሰ-ወሰዳ ሂደቶች',
    excerpt: 'Emergency response for safety incidents.',
    excerptAm: 'ለደህንነት አደጋ ድንገተኛ ምላሽ ሂደቶች።',
    content: 'Communication templates, logistics plan, and batch isolation procedures for rapid product withdrawal from market.',
    category: 'cat10',
    role: 'BOTH',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
    date: '2025-11-10',
    author: 'Safety Lead',
  },

  // CAT 11: PARTNERSHIPS (Farmer read, Staff write)
  {
    id: '11-1',
    title: 'Relations with Farmer Cooperatives',
    titleAm: 'ከአርሶ አደር ኅብረት ሥራ ማህበራት ጋር ያለ ግንኙነት',
    excerpt: 'Building long-term beneficial partnerships.',
    excerptAm: 'ዘላቂ ጠቃሚ አጋርነቶችን መገንባት።',
    content: 'Joint investment programs, shared services, and knowledge exchange with Bishoftu-area cooperatives.',
    category: 'cat11',
    role: 'BOTH',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    date: '2025-12-05',
    author: 'Social Impact Team',
  },
  {
    id: '11-2',
    title: 'ILRI & BRIDGE+ Partnership',
    titleAm: 'ILRI እና BRIDGE+ አጋርነት',
    excerpt: 'Research and development collaboration with ILRI.',
    excerptAm: 'ከILRI ጋር ምርምር እና ልማት ትብብር።',
    content: 'Holland Dairy partners with ILRI to improve smallholder productivity. BRIDGE+ Project provides farmer training and veterinary support across Oromia.',
    category: 'cat11',
    role: 'BOTH',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1454165833767-027508496b41?auto=format&fit=crop&q=80&w=800',
    date: '2025-12-15',
    author: 'Partnerships Dept',
  },
  {
    id: '11-3',
    title: 'Dutch Technology Partners',
    titleAm: 'የደች ቴክኖሎጂ አጋሮች',
    excerpt: 'Collaboration with Dutch equipment and R&D providers.',
    excerptAm: 'ከደች መሣሪያ እና R&D አቅራቢዎች ጋር ትብብር።',
    content: 'Our $2M cold storage facility was designed and installed by FrieslandCampina partners. Ongoing technical support and spare parts are maintained under agreement.',
    category: 'cat11',
    role: 'ADMIN',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    date: '2025-12-20',
    author: 'BOD Member',
  },
];

// ================================================================
// TUTORIAL VIDEOS (6 – Amharic voiceover)
// ================================================================
export const tutorialVideos: TutorialVideo[] = [
  {
    id: 'v1',
    title: 'Modern Milking Techniques',
    titleAm: 'ዘመናዊ ወተት መጥባት ዘዴዎች',
    thumbnail: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=800',
    duration: '12:45',
    category: 'cat3',
    role: 'FARMER',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '2.1k',
    date: '2025-06-20',
    hasAmharicVoiceover: true,
  },
  {
    id: 'v2',
    title: 'Cow Health: Identifying Common Diseases',
    titleAm: 'የላም ጤና: የተለመዱ በሽታዎችን መለየት',
    thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    duration: '18:30',
    category: 'cat9',
    role: 'FARMER',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '3.5k',
    date: '2025-07-10',
    hasAmharicVoiceover: true,
  },
  {
    id: 'v3',
    title: 'Optimal Feeding for High Yield',
    titleAm: 'ለከፍተኛ ምርት ጥሩ አመጋገብ',
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    duration: '14:00',
    category: 'cat9',
    role: 'FARMER',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '1.8k',
    date: '2025-08-05',
    hasAmharicVoiceover: true,
  },
  {
    id: 'v4',
    title: 'Milk Quality Testing at Home',
    titleAm: 'በቤት ያለ የወተት ጥራት ሙከራ',
    thumbnail: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800',
    duration: '09:15',
    category: 'cat3',
    role: 'FARMER',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '4.2k',
    date: '2025-09-01',
    hasAmharicVoiceover: true,
  },
  {
    id: 'v5',
    title: 'CIP: Cleaning Dutch Machinery',
    titleAm: 'CIP: የደች መሣሪያ ጽዳት',
    thumbnail: 'https://images.unsplash.com/photo-1536531327116-2e457f9037be?auto=format&fit=crop&q=80&w=800',
    duration: '22:10',
    category: 'cat1',
    role: 'STAFF',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '980',
    date: '2025-07-25',
    hasAmharicVoiceover: true,
  },
  {
    id: 'v6',
    title: 'HACCP Walkthrough – Factory Floor',
    titleAm: 'HACCP ዙር – ፋብሪካ ወለል',
    thumbnail: 'https://images.unsplash.com/photo-1579165466531-39665752e811?auto=format&fit=crop&q=80&w=800',
    duration: '31:00',
    category: 'cat2',
    role: 'STAFF',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '1.1k',
    date: '2025-10-12',
    hasAmharicVoiceover: true,
  },
];

// ================================================================
// RECIPES (1,000L batches)
// ================================================================
export const recipes: Recipe[] = [
  {
    id: 'r1',
    name: 'Natural Set Yoghurt',
    nameAm: 'ተፈጥሮ የሰሜን እርጎ',
    batchSizeLiters: 1000,
    ingredients: [
      { name: 'Whole Milk', amount: '1000', unit: 'L' },
      { name: 'Starter Culture (S. thermophilus)', amount: '2.5', unit: 'kg' },
      { name: 'Starter Culture (L. bulgaricus)', amount: '1.0', unit: 'kg' },
    ],
    steps: [
      'Pasteurise milk at 85°C for 30 minutes.',
      'Cool to 43°C in heat exchanger.',
      'Add starter cultures and mix for 5 minutes.',
      'Fill into cups and seal.',
      'Incubate at 43°C for 4–5 hours until pH ≤ 4.6.',
      'Transfer to cold store at 4°C.',
    ],
    category: 'cat1',
    version: 'v3.2',
    lastUpdated: '15/3/2019',
    author: 'R&D Team',
  },
  {
    id: 'r2',
    name: 'Strawberry Fruit Yoghurt',
    nameAm: 'እንጆሪ ፍሬ እርጎ',
    batchSizeLiters: 1000,
    ingredients: [
      { name: 'Whole Milk', amount: '1000', unit: 'L' },
      { name: 'Starter Culture', amount: '3.5', unit: 'kg' },
      { name: 'Strawberry Fruit Prep (45% fruit)', amount: '120', unit: 'kg' },
      { name: 'Sugar', amount: '80', unit: 'kg' },
    ],
    steps: [
      'Pasteurise milk at 85°C for 30 minutes.',
      'Cool to 43°C.',
      'Add starter cultures and incubate 4 hours.',
      'Add strawberry prep and sugar under agitation.',
      'Fill into cups, seal, refrigerate at 4°C.',
    ],
    category: 'cat1',
    version: 'v2.1',
    lastUpdated: '20/6/2019',
    author: 'R&D Team',
  },
  {
    id: 'r3',
    name: 'Mango Yoghurt Drink',
    nameAm: 'ማንጎ የወተት መጠጥ',
    batchSizeLiters: 1000,
    ingredients: [
      { name: 'Skimmed Milk', amount: '850', unit: 'L' },
      { name: 'Starter Culture', amount: '2.0', unit: 'kg' },
      { name: 'Mango Concentrate', amount: '60', unit: 'kg' },
      { name: 'Sugar', amount: '60', unit: 'kg' },
      { name: 'Water', amount: '150', unit: 'L' },
    ],
    steps: [
      'Pasteurise skim milk at 90°C for 15 minutes.',
      'Cool to 40°C, add culture, ferment 3 hours.',
      'Blend mango concentrate, sugar, and water.',
      'Mix fermented milk with mango blend.',
      'Homogenise and bottle. Store at 4°C.',
    ],
    category: 'cat1',
    version: 'v1.0',
    lastUpdated: '5/8/2019',
    author: 'R&D Team',
  },
];

// ================================================================
// QC RECORDS (30 days in Ethiopian calendar)
// ================================================================
export const qcRecords: QCRecord[] = [
  { id: 'qc1', date: '1/9/2019', batchId: 'B-2019-0901', fat: 3.8, protein: 3.2, bacteria: 12000, pH: 4.5, temperature: 4.2, status: 'PASS', inspector: 'Sara Selassie' },
  { id: 'qc2', date: '2/9/2019', batchId: 'B-2019-0902', fat: 3.7, protein: 3.1, bacteria: 15000, pH: 4.6, temperature: 4.1, status: 'PASS', inspector: 'Sara Selassie' },
  { id: 'qc3', date: '3/9/2019', batchId: 'B-2019-0903', fat: 3.5, protein: 2.9, bacteria: 48000, pH: 4.8, temperature: 5.5, status: 'WARNING', inspector: 'Sara Selassie' },
  { id: 'qc4', date: '5/9/2019', batchId: 'B-2019-0905', fat: 3.9, protein: 3.3, bacteria: 10000, pH: 4.4, temperature: 4.0, status: 'PASS', inspector: 'Daniel Mekonnen' },
  { id: 'qc5', date: '7/9/2019', batchId: 'B-2019-0907', fat: 3.2, protein: 2.8, bacteria: 120000, pH: 5.1, temperature: 6.8, status: 'FAIL', inspector: 'Daniel Mekonnen' },
  { id: 'qc6', date: '9/9/2019', batchId: 'B-2019-0909', fat: 3.8, protein: 3.2, bacteria: 11000, pH: 4.5, temperature: 4.1, status: 'PASS', inspector: 'Sara Selassie' },
  { id: 'qc7', date: '12/9/2019', batchId: 'B-2019-0912', fat: 4.0, protein: 3.4, bacteria: 9000, pH: 4.4, temperature: 4.0, status: 'PASS', inspector: 'Sara Selassie' },
  { id: 'qc8', date: '15/9/2019', batchId: 'B-2019-0915', fat: 3.7, protein: 3.1, bacteria: 13000, pH: 4.5, temperature: 4.2, status: 'PASS', inspector: 'Daniel Mekonnen' },
  { id: 'qc9', date: '18/9/2019', batchId: 'B-2019-0918', fat: 3.6, protein: 3.0, bacteria: 35000, pH: 4.7, temperature: 5.0, status: 'WARNING', inspector: 'Sara Selassie' },
  { id: 'qc10', date: '20/9/2019', batchId: 'B-2019-0920', fat: 3.9, protein: 3.3, bacteria: 8000, pH: 4.4, temperature: 3.9, status: 'PASS', inspector: 'Daniel Mekonnen' },
];

// ================================================================
// MAINTENANCE LOGS
// ================================================================
export const maintenanceLogs: MaintenanceLog[] = [
  { id: 'm1', equipment: 'Dutch Pasteuriser Unit A', lastService: '1/7/2019', nextService: '1/10/2019', status: 'OK', technician: 'Hiwot Girma', notes: 'Seals replaced. Pressure tests passed.' },
  { id: 'm2', equipment: 'Cold Storage Unit 1', lastService: '15/6/2019', nextService: '15/9/2019', status: 'DUE', technician: 'Hiwot Girma', notes: 'Refrigerant level check needed.' },
  { id: 'm3', equipment: 'Homogeniser B', lastService: '10/8/2019', nextService: '10/11/2019', status: 'OK', technician: 'External Tech', notes: 'Bearings greased, valves calibrated.' },
  { id: 'm4', equipment: 'CIP Dosing System', lastService: '20/5/2019', nextService: '20/8/2019', status: 'OVERDUE', technician: 'Hiwot Girma', notes: 'Chemical pump calibration overdue.' },
  { id: 'm5', equipment: 'Wastewater Treatment Plant', lastService: '1/9/2019', nextService: '1/12/2019', status: 'OK', technician: 'External Tech', notes: 'Biofilter media replaced.' },
];

// ================================================================
// MILK RECORDS (5 farmers)
// ================================================================
export const milkRecords: MilkRecord[] = [
  { id: 'mr1', farmerId: '2', date: '1/9/2019', liters: 82, quality: 'A', notes: 'Morning collection. Good condition.' },
  { id: 'mr2', farmerId: '2', date: '2/9/2019', liters: 88, quality: 'A' },
  { id: 'mr3', farmerId: '2', date: '3/9/2019', liters: 75, quality: 'B', notes: 'One cow showing reduced yield.' },
  { id: 'mr4', farmerId: '4', date: '1/9/2019', liters: 52, quality: 'A' },
  { id: 'mr5', farmerId: '4', date: '2/9/2019', liters: 58, quality: 'A' },
  { id: 'mr6', farmerId: '5', date: '1/9/2019', liters: 108, quality: 'A' },
  { id: 'mr7', farmerId: '6', date: '1/9/2019', liters: 40, quality: 'B' },
  { id: 'mr8', farmerId: '7', date: '1/9/2019', liters: 145, quality: 'A' },
];

// ================================================================
// PAYMENT RECORDS
// ================================================================
export const paymentRecords: PaymentRecord[] = [
  { id: 'pay1', farmerId: '2', date: '1/9/2019', liters: 2550, pricePerLiter: 22, total: 56100, status: 'PAID' },
  { id: 'pay2', farmerId: '2', date: '15/8/2019', liters: 2480, pricePerLiter: 22, total: 54560, status: 'PAID' },
  { id: 'pay3', farmerId: '2', date: '1/8/2019', liters: 2400, pricePerLiter: 20, total: 48000, status: 'PAID' },
  { id: 'pay4', farmerId: '4', date: '1/9/2019', liters: 1620, pricePerLiter: 22, total: 35640, status: 'PAID' },
  { id: 'pay5', farmerId: '5', date: '1/9/2019', liters: 3300, pricePerLiter: 22, total: 72600, status: 'PENDING' },
];

// ================================================================
// SMS ALERTS
// ================================================================
export const smsAlerts: SMSAlert[] = [
  { id: 's1', date: '20/9/2019', message: 'Collection schedule: Tomorrow 6AM at Bishoftu Center. Bring clean containers.', messageAm: 'የሰብሳቢ ጊዜ ሰሌዳ: ነገ ጠዋት ከ6 ሰዓት ባቢዮ ቡድን፣ ንጹህ ዕቃ አምጡ።', type: 'COLLECTION' },
  { id: 's2', date: '18/9/2019', message: 'FMD alert in neighboring zone. Keep livestock away from unknown animals. Report symptoms to vet.', messageAm: 'በጎረቤት ዞን የFMD ማስጠንቀቂያ። ከብቶችን ከማያውቋቸው እንስሳት አርቁ። ምልክቶችን ለየትኛ ሐኪም ያሳውቁ።', type: 'DISEASE' },
  { id: 's3', date: '15/9/2019', message: 'Milk price update: Grade A now 22 ETB/L from Meskerem 1, 2019.', messageAm: 'የወተት ዋጋ ዝመና: ደረጃ A አሁን ከ2019 ዓ.ም. መስከረም 1 ጀምሮ 22 ብር/ሊትር።', type: 'PRICE' },
  { id: 's4', date: '5/8/2019', message: 'Farmer Training Day: Bishoftu Community Hall, Nehase 5, 2019 at 9AM.', messageAm: 'የተሻሻለ የወተት ምርት ሥልጠና: ባቢዮ ማህበረሰብ አዳራሽ ነሐሴ 5 ዓ.ም. 9 ሰዓት።', type: 'EVENT' },
];

// ================================================================
// POSTS & TICKETS & NOTIFICATIONS
// ================================================================
export const mockPosts: Post[] = [
  {
    id: 'p1',
    authorName: 'Abebe Bikila',
    authorRole: 'FARMER',
    content: 'Has anyone else noticed higher milk yields after switching to clover forage? I saw a 10% increase in 2 weeks.',
    contentAm: 'ወደ ቅጠላ ቅጠሎ ምግብ ከቀየሩ በኋላ ወተት ምርት ጨምሯል? ከ2 ሳምንት ውስጥ 10% ጨምሬ አየሁ።',
    timestamp: '2025-03-25T10:00:00Z',
    likes: 14,
    category: 'cat9',
    comments: [
      { id: 'c1', authorName: 'Tigist Haile', authorRole: 'FARMER', content: 'Yes! Started last month—mine went up 8%.', timestamp: '2025-03-25T11:30:00Z' },
    ],
  },
  {
    id: 'p2',
    authorName: 'Sara Selassie',
    authorRole: 'STAFF',
    content: 'Reminder: All batch records must be completed before end of Nehase shift. QC inspection on Pagume 1.',
    timestamp: '2025-08-28T08:00:00Z',
    likes: 5,
    category: 'cat2',
    comments: [],
  },
];

export const mockTickets: Ticket[] = [
  {
    id: 't1',
    userId: '2',
    title: 'Payment missing for Nehase 1 delivery',
    description: 'I delivered 82L on Nehase 1 (1/9/2019) but my payment shows 0 ETB for that date.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    category: 'cat3',
    timestamp: '2025-08-05T08:00:00Z',
    updates: [
      { id: 'u1', authorName: 'Admin User', content: 'We are cross-checking the ledger. Will update by Monday.', timestamp: '2025-08-06T10:00:00Z' },
    ],
  },
  {
    id: 't2',
    userId: '4',
    title: 'Cow showing respiratory symptoms',
    description: 'One of my cows has nasal discharge and reduced appetite since yesterday.',
    status: 'OPEN',
    priority: 'HIGH',
    category: 'cat9',
    timestamp: '2025-09-10T07:30:00Z',
    updates: [],
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '2',
    title: 'New Article Published',
    message: 'Check out "Animal Welfare Practices" for herd health tips.',
    type: 'ARTICLE',
    read: false,
    timestamp: '2025-10-15T10:00:00Z',
    link: '/article/9-2',
  },
  {
    id: 'n2',
    userId: '3',
    title: 'QC Alert',
    message: 'Batch B-2019-0907 failed pH threshold. Immediate action required.',
    type: 'ANNOUNCEMENT',
    read: false,
    timestamp: '2025-09-07T14:00:00Z',
    link: '/quality-dashboard',
  },
];

export const mockContactMessages = [
  { id: 'cm1', name: 'Lemma Fikru', email: 'lemma@email.com', subject: 'Farm Registration', message: 'I want to register my 10-cow farm with Holland Dairy.', date: '10/9/2019' },
  { id: 'cm2', name: 'Senait Wolde', email: 'senait@email.com', subject: 'Payment Issue', message: 'My September payment has not arrived.', date: '20/9/2019' },
];
