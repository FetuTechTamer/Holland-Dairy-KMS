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
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  role: Role | 'BOTH';
  readTime: string;
  image: string;
  date: string;
  version?: string;
  author: string;
}

export interface Post {
  id: string;
  authorName: string;
  authorRole: Role;
  content: string;
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

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@holland.com', role: 'ADMIN', joinDate: '2023-01-01' },
  { id: '2', name: 'Abebe Bikila', email: 'abebe@farmer.com', role: 'FARMER', joinDate: '2023-05-12' },
  { id: '3', name: 'Sara Selassie', email: 'sara@staff.com', role: 'STAFF', joinDate: '2023-03-20', department: 'Processing' },
  { id: '4', name: 'Kebede Molla', email: 'kebede@farmer.com', role: 'FARMER', joinDate: '2024-01-15' },
  { id: '5', name: 'Martha Hailu', email: 'martha@staff.com', role: 'STAFF', joinDate: '2023-11-05', department: 'Quality Control' },
];

export const farmerArticles: Article[] = [
  {
    id: 'f1',
    title: 'How to improve milk quality',
    excerpt: 'Detailed steps on maintaining hygiene and proper storage to ensure premium milk quality.',
    content: 'Milk quality starts at the source. This guide covers everything from cow cleanliness to the temperature of storage tanks...',
    category: 'milkQuality',
    role: 'FARMER',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-15',
    author: 'Dr. Henok'
  },
  {
    id: 'f2',
    title: 'Calf vaccination schedule',
    excerpt: 'A complete timeline of essential vaccinations for healthy calf growth.',
    content: 'Timely vaccination is crucial. Here is the recommended schedule for the first 12 months of a calf\'s life...',
    category: 'breeding',
    role: 'FARMER',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=800',
    date: '2024-02-28',
    author: 'Vet Team'
  },
  {
    id: 'f3',
    title: 'Clean milking procedures',
    excerpt: 'The 7-step checklist for hygienic milking to prevent mastitis and contamination.',
    content: 'Hygiene is paramount. Wash your hands, clean the udders, and use sanitized equipment every single time...',
    category: 'health',
    role: 'FARMER',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1605367060295-d250868f05ed?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-10',
    author: 'Holland Field Team'
  },
  {
    id: 'f4',
    title: 'Feeding for higher yield',
    excerpt: 'Optimizing nutrition to increase daily milk production while keeping cows healthy.',
    content: 'What goes in determines what comes out. Learn about the perfect balance of forage and concentrates...',
    category: 'nutrition',
    role: 'FARMER',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    date: '2024-01-20',
    author: 'Nutritionist'
  },
  {
    id: 'f5',
    title: 'Spotting sick cows early',
    excerpt: 'Key indicators and behavioral changes to watch for to identify health issues before they spread.',
    content: 'Observation is your best tool. Watch for changes in standing patterns, feeding speed, and ear position...',
    category: 'health',
    role: 'FARMER',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1545468843-ea7674720993?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-01',
    author: 'Dr. Samuel'
  },
  {
    id: 'f6',
    title: 'Water management for dairy farms',
    excerpt: 'Ensuring access to clean water and managing waste effectively on your farm.',
    content: 'Cows need a lot of water. This article explores water source protection and irrigation for grazing land...',
    category: 'logistics',
    role: 'FARMER',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=800',
    date: '2024-02-15',
    author: 'Resources Dept'
  }
];

export const staffArticles: Article[] = [
  {
    id: 's1',
    title: 'Yoghurt pasteurization SOP',
    excerpt: 'Standard Operating Procedure for high-temperature short-time pasteurization of yoghurt base.',
    content: 'Critical limits: 85-90°C for at least 5 minutes. Monitoring requirements: Digital thermometer logs hourly...',
    category: 'processing',
    role: 'STAFF',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1536531327116-2e457f9037be?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-01',
    version: 'v2.1',
    author: 'QC Mgr'
  },
  {
    id: 's2',
    title: 'Strawberry yoghurt recipe',
    excerpt: 'Official Holland Dairy recipe for strawberry yoghurt using Dutch technology and local berries.',
    content: 'Ingredients ratio: Whole milk 85%, Strawberry preparation 12%, Live cultures 3%...',
    category: 'processing',
    role: 'STAFF',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800',
    date: '2024-02-15',
    version: 'v1.4',
    author: 'Production Dept'
  },
  {
    id: 's3',
    title: 'Packaging machine maintenance',
    excerpt: 'Weekly and monthly maintenance checklist for the Tetrapak packaging line.',
    content: 'Lubrication points, sensor cleaning, and seal integrity testing protocols for the maintenance team...',
    category: 'logistics',
    role: 'STAFF',
    readTime: '20 min',
    image: 'https://images.unsplash.com/photo-1615810283732-75d3369a4897?auto=format&fit=crop&q=80&w=800',
    date: '2024-01-10',
    version: 'v3.0',
    author: 'Maintenance Lead'
  },
  {
    id: 's4',
    title: 'Quality control daily checklist',
    excerpt: 'A list of all tests that must be performed on incoming raw milk and outgoing products.',
    content: 'Tests: pH level, Fat content, Alcohol test, Bacterial count (sampled per batch)...',
    category: 'milkQuality',
    role: 'STAFF',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1579165466531-39665752e811?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-10',
    version: 'v2.0',
    author: 'Lab Team'
  },
  {
    id: 's5',
    title: 'Safety protocol: Chemical handling',
    excerpt: 'Critical safety guidelines for handling cleaning chemicals and experimental additives.',
    content: 'Always wear PPE (gloves, goggles, apron). In case of spill, follow the neutralizer protocol...',
    category: 'safety',
    role: 'STAFF',
    readTime: '15 min',
    image: 'https://images.unsplash.com/photo-1582719471327-593256093481?auto=format&fit=crop&q=80&w=800',
    date: '2023-12-05',
    version: 'v1.0',
    author: 'Safety Officer'
  },
  {
    id: 's6',
    title: 'Cold chain logistics management',
    excerpt: 'Ensuring temperature control from factory dispatch to retail outlets.',
    content: 'Refrigerated trucks must maintain 2-4°C. Bluetooth tracking devices must be active and synchronized...',
    category: 'logistics',
    role: 'STAFF',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1586528116311-ad86df6283b4?auto=format&fit=crop&q=80&w=800',
    date: '2024-02-20',
    version: 'v2.2',
    author: 'Logistics Mgr'
  }
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    authorName: 'Abebe Bikila',
    authorRole: 'FARMER',
    content: 'Has anyone else noticed higher milk yields after switching to the new clover forage? My cows seem much happier too!',
    timestamp: '2024-03-25T10:00:00Z',
    likes: 12,
    category: 'nutrition',
    comments: [
      { id: 'c1', authorName: 'Kebede Molla', authorRole: 'FARMER', content: 'Yes! I started last month and saw a 10% increase.', timestamp: '2024-03-25T11:30:00Z' }
    ]
  },
  {
    id: 'p2',
    authorName: 'Sara Selassie',
    authorRole: 'STAFF',
    content: 'The new pasteurization timers are working great. Saves us 15 minutes per batch. Thanks to the maintenance team!',
    timestamp: '2024-03-24T09:15:00Z',
    likes: 8,
    category: 'processing',
    comments: []
  },
  {
    id: 'p3',
    authorName: 'Kebede Molla',
    authorRole: 'FARMER',
    content: 'Looking for advice on calf housing during the heavy rains. Any tips for keeping the bedding dry?',
    timestamp: '2024-03-23T14:45:00Z',
    likes: 5,
    category: 'health',
    comments: [
      { id: 'c2', authorName: 'Holland Field Team', authorRole: 'STAFF', content: 'Try using elevated wooden pallets under the straw. We have some blueprints if you need them.', timestamp: '2024-03-23T16:00:00Z' }
    ]
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 't1',
    userId: '2', // Abebe
    title: 'Payment missing for March 15th delivery',
    description: 'I delivered 50L on March 15th but my payment dashboard shows 0.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    category: 'Payments',
    timestamp: '2024-03-20T08:00:00Z',
    updates: [
      { id: 'u1', authorName: 'Admin', content: 'We are checking the ledger with the collection point officer.', timestamp: '2024-03-21T10:00:00Z' }
    ]
  },
  {
    id: 't2',
    userId: '3', // Sara
    title: 'Faulty sensor on Pasteurizer B',
    description: 'The temperature sensor is fluctuating wildly during the cooling phase.',
    status: 'OPEN',
    priority: 'MEDIUM',
    category: 'Maintenance',
    timestamp: '2024-03-26T13:00:00Z',
    updates: []
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '2',
    title: 'New Article Published',
    message: 'Check out "Feeding for higher yield" for latest tips.',
    type: 'ARTICLE',
    read: false,
    timestamp: '2024-03-26T10:00:00Z',
    link: '/article/f4'
  },
  {
    id: 'n2',
    userId: '2',
    title: 'Ticket Update',
    message: 'Admin replied to your payment issue ticket.',
    type: 'TICKET',
    read: true,
    timestamp: '2024-03-21T10:05:00Z',
    link: '/tickets'
  }
];

export const mockContactMessages = [
  { name: 'John Doe', email: 'john@example.com', subject: 'Inquiry', message: 'I would like to visit the farm.', date: '2024-03-20' },
  { name: 'Mary Jane', email: 'mary@test.com', subject: 'Suppliers', message: 'Do you sell organic milk?', date: '2024-03-22' }
];
