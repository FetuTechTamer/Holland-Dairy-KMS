/**
 * LocalStorage helpers for Holland Dairy Knowledge Hub
 */

export const STORAGE_KEYS = {
  USER: 'holland_user',
  THEME: 'holland_theme',
  LANGUAGE: 'holland_lang',
  NOTIFICATIONS: 'holland_notifications',
  TICKETS: 'holland_tickets',
  POSTS: 'holland_posts',
  CONTACT_MESSAGES: 'holland_contact_messages',
  SAVED_ARTICLES: 'holland_saved_articles',
  RECENT_SEARCHES: 'holland_recent_searches',
  REMEMBER_ME: 'holland_remember_me',
};

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const saved = localStorage.getItem(key);
    if (!saved) return defaultValue;
    try {
      return JSON.parse(saved) as T;
    } catch (e) {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
};
