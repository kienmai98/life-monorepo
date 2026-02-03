import React, { useState } from 'react';
import type { ContentFormData, ContentType, ContentStatus } from '../../../entities/content/model/types';

interface ContentEditorProps {
  initialData?: Partial<ContentFormData>;
  onSubmit: (data: ContentFormData) => void;
  onCancel: () => void;
}

const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: 'page', label: 'Page' },
  { value: 'post', label: 'Blog Post' },
  { value: 'faq', label: 'FAQ' },
  { value: 'announcement', label: 'Announcement' },
];

const CONTENT_STATUSES: { value: ContentStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

export const ContentEditor: React.FC<ContentEditorProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ContentFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    type: initialData?.type || 'post',
    status: initialData?.status || 'draft',
    tags: initialData?.tags || [],
  });

  const [tagInput, setTagInput] = useState('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev: ContentFormData) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev: ContentFormData) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev: ContentFormData) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="content-editor">
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="form-input"
          placeholder="Enter title..."
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData((prev: ContentFormData) => ({ ...prev, slug: e.target.value }))}
            className="form-input"
            placeholder="url-friendly-name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData((prev: ContentFormData) => ({ ...prev, type: e.target.value as ContentType }))}
            className="form-select"
          >
            {CONTENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData((prev: ContentFormData) => ({ ...prev, status: e.target.value as ContentStatus }))}
            className="form-select"
          >
            {CONTENT_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData((prev: ContentFormData) => ({ ...prev, content: e.target.value }))}
          className="form-textarea"
          placeholder="Write your content here..."
          rows={10}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Tags</label>
        <div className="tag-input-wrapper">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            className="form-input"
            placeholder="Add tag and press Enter"
          />
          <button type="button" onClick={handleAddTag} className="btn btn-secondary">
            Add
          </button>
        </div>
        <div className="tag-list">
          {formData.tags.map((tag: string) => (
            <span key={tag} className="tag">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="tag-remove">
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-ghost">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default ContentEditor;
