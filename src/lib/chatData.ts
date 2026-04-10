import { Role } from './mockData';

export interface Message {
  id: string | number;
  senderId: string;
  senderName: string;
  senderRole: Role;
  message: string;
  time: string;
  date: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: Role;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageDate: string;
  unread: number;
  messages: Message[];
}

export const chatConversations: Conversation[] = [
  {
    id: 'admin-1',
    participantId: 'admin-1',
    participantName: 'John Admin',
    participantRole: 'ADMIN',
    participantAvatar: '👑',
    lastMessage: 'Tomorrow at 9 AM',
    lastMessageTime: '10:30 AM',
    lastMessageDate: '10/4/2019',
    unread: 2,
    messages: [
      { id: 1, senderId: 'staff-1', senderName: 'You', senderRole: 'STAFF', message: 'When is the audit?', time: '10:15 AM', date: '10/4/2019' },
      { id: 2, senderId: 'admin-1', senderName: 'John Admin', senderRole: 'ADMIN', message: 'Tomorrow at 9 AM', time: '10:30 AM', date: '10/4/2019' }
    ]
  },
  {
    id: 'farmer-1',
    participantId: 'farmer-1',
    participantName: 'Alemu',
    participantRole: 'FARMER',
    participantAvatar: '🧑🌾',
    lastMessage: 'Thanks for your help!',
    lastMessageTime: '3:00 PM',
    lastMessageDate: '9/4/2019',
    unread: 0,
    messages: [
      { id: 1, senderId: 'farmer-1', senderName: 'Alemu', senderRole: 'FARMER', message: 'My cow is sick. What should I do?', time: '2:30 PM', date: '9/4/2019' },
      { id: 2, senderId: 'staff-1', senderName: 'You', senderRole: 'STAFF', message: 'Call the vet. I will send contact', time: '2:45 PM', date: '9/4/2019' },
      { id: 3, senderId: 'farmer-1', senderName: 'Alemu', senderRole: 'FARMER', message: 'Thanks for your help!', time: '3:00 PM', date: '9/4/2019' }
    ]
  },
  {
    id: 'farmer-2',
    participantId: 'farmer-2',
    participantName: 'Tigist',
    participantRole: 'FARMER',
    participantAvatar: '🧑🌾',
    lastMessage: 'Help! Milk collection delayed',
    lastMessageTime: '8:00 AM',
    lastMessageDate: '8/4/2019',
    unread: 1,
    messages: [
      { id: 1, senderId: 'farmer-2', senderName: 'Tigist', senderRole: 'FARMER', message: 'Help! Milk collection delayed', time: '8:00 AM', date: '8/4/2019' }
    ]
  }
];
