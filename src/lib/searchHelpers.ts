import { Article, Ticket, Post } from './mockData';

export const filterArticles = (articles: Article[], query: string, category?: string) => {
  return articles.filter(article => {
    const matchesQuery = query 
      ? article.title.toLowerCase().includes(query.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesCategory = category && category !== 'all' 
      ? article.category === category 
      : true;
    return matchesQuery && matchesCategory;
  });
};

export const filterTickets = (tickets: Ticket[], query: string) => {
  if (!query) return tickets;
  return tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(query.toLowerCase()) || 
    ticket.description.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterPosts = (posts: Post[], query: string) => {
  if (!query) return posts;
  return posts.filter(post => 
    post.content.toLowerCase().includes(query.toLowerCase()) || 
    post.authorName.toLowerCase().includes(query.toLowerCase())
  );
};
