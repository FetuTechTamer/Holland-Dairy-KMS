import { StaffSubRole } from './mockData';

export interface Announcement {
  id: string;
  title: string;
  message: string;
  author: string;
  authorRole: string;
  timestamp: string; // Ethiopian Calendar
  isUrgent: boolean;
  readBy: string[]; // User IDs
}

export interface ChatMessage {
  id: string;
  roomId: string;
  authorId: string;
  authorName: string;
  authorSubRole: StaffSubRole | 'ADMIN';
  text: string;
  timestamp: string; // Ethiopian Calendar
}

export interface ChatRoom {
  id: string;
  name: string;
  members: number;
  unreadCount: number;
  type: 'departmental' | 'general';
  pinnedMessage?: {
    text: string;
    author: string;
  };
  participants?: {
    id: string;
    name: string;
    role: StaffSubRole | 'ADMIN';
    isOnline: boolean;
  }[];
}

export interface KnowledgeTip {
  id: string;
  title: string;
  text: string;
  author: string;
  authorSubRole: StaffSubRole;
  timestamp: string;
  likes: number;
  helpfulCount: number;
  comments: number;
  category: 'Production Tip' | 'Quality Tip' | 'Logistics Tip' | 'Safety Tip' | 'Efficiency';
}

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New production target for Q4 2019',
    message: 'Aim for 50,000 liters by end of year',
    author: 'Admin',
    authorRole: 'ADMIN',
    timestamp: '8/4/2019',
    isUrgent: true,
    readBy: []
  },
  {
    id: 'ann-2',
    title: 'Quality audit next week',
    message: 'ISO 22000 audit on 15/4/2019. Please ensure all logs are updated.',
    author: 'Quality Staff',
    authorRole: 'QUALITY',
    timestamp: '5/4/2019',
    isUrgent: false,
    readBy: []
  },
  {
    id: 'ann-3',
    title: 'New delivery routes added',
    message: 'Adama and Hawassa routes now active. Refer to logistics board.',
    author: 'Logistics Staff',
    authorRole: 'LOGISTICS',
    timestamp: '9/4/2019',
    isUrgent: false,
    readBy: []
  }
];

export const mockChatRooms: ChatRoom[] = [
  { 
    id: 'production', 
    name: '#production-chat', 
    members: 12, 
    unreadCount: 3,
    type: 'departmental',
    pinnedMessage: { text: 'Today\'s Target: 50,000L processed by midnight.', author: 'Admin' },
    participants: [
      { id: '1', name: 'Tigist D.', role: 'PRODUCTION', isOnline: true },
      { id: '2', name: 'Abebe K.', role: 'PRODUCTION', isOnline: true },
      { id: '3', name: 'Samuel L.', role: 'PRODUCTION', isOnline: false },
    ]
  },
  { 
    id: 'quality', 
    name: '#quality-lab', 
    members: 8, 
    unreadCount: 1,
    type: 'departmental',
    pinnedMessage: { text: 'All samples must be entered into the system before shift end.', author: 'Almaz D.' },
    participants: [
      { id: '4', name: 'Almaz D.', role: 'QUALITY', isOnline: true },
      { id: '5', name: 'Berhanu G.', role: 'QUALITY', isOnline: false },
    ]
  },
  { 
    id: 'logistics', 
    name: '#logistics', 
    members: 6, 
    unreadCount: 2,
    type: 'departmental',
     participants: [
      { id: '6', name: 'Tekle B.', role: 'LOGISTICS', isOnline: true },
    ]
  },
  { 
    id: 'sales', 
    name: '#sales', 
    members: 4, 
    unreadCount: 0,
    type: 'departmental',
    participants: [
      { id: 'sales-1', name: 'Bekele Tadese', role: 'SALES', isOnline: true },
    ]
  },
  { 
    id: 'general', 
    name: '#general', 
    members: 26, 
    unreadCount: 7,
    type: 'general',
    participants: [
       { id: 'admin', name: 'Holland Admin', role: 'ADMIN', isOnline: true },
       { id: '1', name: 'Tigist D.', role: 'PRODUCTION', isOnline: true },
       { id: '4', name: 'Almaz D.', role: 'QUALITY', isOnline: true },
       { id: 'sales-1', name: 'Bekele Tadese', role: 'SALES', isOnline: true },
    ]
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    roomId: 'production',
    authorId: 'staff-prod',
    authorName: 'Tigist D.',
    authorSubRole: 'PRODUCTION',
    text: 'Has anyone checked the temperature on pasteurizer 3?',
    timestamp: '9/4/2019 10:30'
  },
  {
    id: 'msg-2',
    roomId: 'production',
    authorId: 'staff-qual',
    authorName: 'Almaz D.',
    authorSubRole: 'QUALITY',
    text: 'Yes, I just took a sample. Everything looks within spec.',
    timestamp: '9/4/2019 10:35'
  }
];

export const mockKnowledgeTips: KnowledgeTip[] = [
  {
    id: 'tip-1',
    title: 'How to clean pasteurizer faster',
    text: 'Using the new pre-rinse cycle saves 15 minutes per batch.',
    author: 'Tigist D.',
    authorSubRole: 'PRODUCTION',
    timestamp: '3 days ago',
    likes: 12,
    helpfulCount: 12,
    comments: 4,
    category: 'Production Tip'
  },
  {
    id: 'tip-2',
    title: 'New bacterial testing method',
    text: 'The rapid-plate method gives results in 12 hours instead of 24.',
    author: 'Almaz D.',
    authorSubRole: 'QUALITY',
    timestamp: '1 week ago',
    likes: 8,
    helpfulCount: 8,
    comments: 2,
    category: 'Quality Tip'
  },
  {
    id: 'tip-3',
    title: 'Cold storage temperature optimization',
    text: 'Keeping Zone B at 3.9C instead of 4.1C significantly increases shelf life for mango yoghurt.',
    author: 'Tekle B.',
    authorSubRole: 'LOGISTICS',
    timestamp: '4 days ago',
    likes: 15,
    helpfulCount: 15,
    comments: 6,
    category: 'Logistics Tip'
  },
  {
    id: 'tip-4',
    title: 'Customer Insights: Fasting Period',
    text: 'Customers are specifically asking for plant-based alternatives during the upcoming fast. Let\'s push our new oat-based products.',
    author: 'Bekele Tadese',
    authorSubRole: 'SALES',
    timestamp: '1 day ago',
    likes: 22,
    helpfulCount: 18,
    comments: 5,
    category: 'Sales Tip' as unknown as any
  }
];
