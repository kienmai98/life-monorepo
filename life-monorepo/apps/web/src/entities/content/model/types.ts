export type ContentType = 'page' | 'post' | 'faq' | 'announcement';

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  type: ContentType;
  status: ContentStatus;
  authorId: string;
  authorName: string;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface ContentFilter {
  type?: ContentType;
  status?: ContentStatus;
  tags?: string[];
  search?: string;
  authorId?: string;
}

export interface ContentFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  type: ContentType;
  status: ContentStatus;
  tags: string[];
  metadata?: Record<string, unknown>;
}
