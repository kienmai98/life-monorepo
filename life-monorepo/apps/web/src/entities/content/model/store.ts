import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ContentItem, ContentFilter, ContentFormData } from './types.js';

interface ContentState {
  items: ContentItem[];
  filter: ContentFilter | null;
  selectedItem: ContentItem | null;
  isLoading: boolean;
  error: string | null;
}

interface ContentActions {
  getFilteredItems: () => ContentItem[];
  getBySlug: (slug: string) => ContentItem | undefined;
  getByType: (type: ContentItem['type']) => ContentItem[];
  getPublished: () => ContentItem[];
  createItem: (data: ContentFormData, authorId: string, authorName: string) => void;
  updateItem: (id: string, data: Partial<ContentFormData>) => void;
  deleteItem: (id: string) => void;
  publishItem: (id: string) => void;
  archiveItem: (id: string) => void;
  setFilter: (filter: ContentFilter | null) => void;
  selectItem: (item: ContentItem | null) => void;
  clearError: () => void;
  seedSampleData: () => void;
}

type ContentStore = ContentState & ContentActions;

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);
};

const createItem = (
  data: ContentFormData,
  authorId: string,
  authorName: string
): ContentItem => {
  const now = new Date().toISOString();
  const isPublished = data.status === 'published';
  
  return {
    id: `content-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    slug: data.slug || generateSlug(data.title),
    title: data.title,
    content: data.content,
    excerpt: data.excerpt || data.content.substring(0, 150) + '...',
    type: data.type,
    status: data.status,
    authorId,
    authorName,
    tags: data.tags || [],
    metadata: data.metadata || {},
    createdAt: now,
    updatedAt: now,
    publishedAt: isPublished ? now : undefined,
  };
};

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      items: [],
      filter: null,
      selectedItem: null,
      isLoading: false,
      error: null,

      getFilteredItems: () => {
        const { items, filter } = get();
        if (!filter) return items.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        return items
          .filter((item) => {
            if (filter.type && item.type !== filter.type) return false;
            if (filter.status && item.status !== filter.status) return false;
            if (filter.authorId && item.authorId !== filter.authorId) return false;
            if (filter.tags?.length) {
              const hasTag = filter.tags.some((t) => item.tags.includes(t));
              if (!hasTag) return false;
            }
            if (filter.search) {
              const search = filter.search.toLowerCase();
              const matches = 
                item.title.toLowerCase().includes(search) ||
                item.content.toLowerCase().includes(search) ||
                item.excerpt?.toLowerCase().includes(search);
              if (!matches) return false;
            }
            return true;
          })
          .sort((a, b) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
      },

      getBySlug: (slug) => {
        return get().items.find((item) => item.slug === slug && item.status === 'published');
      },

      getByType: (type) => {
        return get()
          .items.filter((item) => item.type === type && item.status === 'published')
          .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - 
            new Date(a.publishedAt || a.createdAt).getTime());
      },

      getPublished: () => {
        return get()
          .items.filter((item) => item.status === 'published')
          .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - 
            new Date(a.publishedAt || a.createdAt).getTime());
      },

      createItem: (data, authorId, authorName) => {
        const newItem = createItem(data, authorId, authorName);
        set((state) => ({ items: [newItem, ...state.items] }));
      },

      updateItem: (id, updates) => {
        const now = new Date().toISOString();
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { 
                  ...item, 
                  ...updates, 
                  updatedAt: now,
                  slug: updates.slug || item.slug,
                  excerpt: updates.excerpt || 
                    (updates.content ? updates.content.substring(0, 150) + '...' : item.excerpt),
                  publishedAt: updates.status === 'published' && item.status !== 'published' 
                    ? now 
                    : item.publishedAt,
                }
              : item
          ),
        }));
      },

      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          selectedItem: state.selectedItem?.id === id ? null : state.selectedItem,
        }));
      },

      publishItem: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, status: 'published', publishedAt: now, updatedAt: now }
              : item
          ),
        }));
      },

      archiveItem: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, status: 'archived', updatedAt: now } : item
          ),
        }));
      },

      setFilter: (filter) => set({ filter }),
      selectItem: (item) => set({ selectedItem: item }),
      clearError: () => set({ error: null }),

      seedSampleData: () => {
        const sampleItems: ContentItem[] = [
          {
            id: 'content-sample-1',
            slug: 'getting-started',
            title: 'Getting Started with Life',
            content: 'Welcome to Life! This app helps you track your finances and schedule. Start by adding your first transaction or event. Use the Money tab to track expenses and income, the Schedule tab for calendar events.',
            excerpt: 'Learn the basics of using the Life app to manage your finances and schedule.',
            type: 'faq',
            status: 'published',
            authorId: 'system',
            authorName: 'System',
            tags: ['help', 'getting-started'],
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 'content-sample-2',
            slug: 'budgeting-tips',
            title: 'Smart Budgeting Tips',
            content: '1. Track every expense, no matter how small. 2. Set monthly spending limits per category. 3. Review your spending weekly. 4. Save at least 20% of your income. 5. Use categories to understand where your money goes.',
            excerpt: 'Five essential tips to help you budget smarter and save more money.',
            type: 'post',
            status: 'published',
            authorId: 'system',
            authorName: 'Life Team',
            tags: ['tips', 'budgeting', 'finance'],
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ];
        set({ items: sampleItems });
      },
    }),
    {
      name: 'content-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useContentStore;
