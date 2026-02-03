import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../entities/user/model/store';
import { useContentStore } from '../entities/content/model/store';
import type { ContentFormData, ContentItem, ContentType, ContentStatus } from '../entities/content/model/types';
import { ContentEditor } from '../features/cms/ui/ContentEditor';
import { ContentList } from '../features/cms/ui/ContentList';
import './CmsPage.css';

const FILTER_TYPES: { value: ContentType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'page', label: 'Pages' },
  { value: 'post', label: 'Posts' },
  { value: 'faq', label: 'FAQ' },
  { value: 'announcement', label: 'Announcements' },
];

const FILTER_STATUSES: { value: ContentStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'draft', label: 'Drafts' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

export const CmsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    getFilteredItems, 
    createItem, 
    updateItem, 
    deleteItem, 
    publishItem, 
    archiveItem,
    setFilter,
    filter,
    seedSampleData 
  } = useContentStore();

  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const items = useContentStore.getState().items;
    if (items.length === 0) {
      seedSampleData();
    }
  }, [seedSampleData]);

  const filteredItems = getFilteredItems().filter((item: ContentItem) =>
    searchQuery
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const handleCreate = (data: ContentFormData) => {
    if (user) {
      createItem(data, user.id, user.displayName || user.email);
      setIsCreating(false);
    }
  };

  const handleUpdate = (data: ContentFormData) => {
    if (editingItem) {
      updateItem(editingItem.id, data);
      setEditingItem(null);
    }
  };

  const handleFilterChange = (key: 'type' | 'status', value: string) => {
    setFilter({
      ...filter,
      [key]: value === 'all' ? undefined : value,
    });
  };

  return (
    <div className="cms-page">
      <header className="cms-header">
        <h1>CONTENT MANAGEMENT</h1>
        <p className="cms-subtitle">Manage pages, posts, FAQ, and announcements</p>
      </header>

      <div className="cms-toolbar">
        <div className="cms-filters">
          <select
            value={filter?.type || 'all'}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="form-select"
          >
            {FILTER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          <select
            value={filter?.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="form-select"
          >
            {FILTER_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
          />
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="btn btn-primary"
          disabled={isCreating || !!editingItem}
        >
          + New Content
        </button>
      </div>

      {(isCreating || editingItem) && (
        <div className="cms-editor-panel">
          <h3>{editingItem ? 'Edit Content' : 'Create Content'}</h3>
          <ContentEditor
            initialData={editingItem || undefined}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={() => {
              setIsCreating(false);
              setEditingItem(null);
            }}
          />
        </div>
      )}

      <div className="cms-content">
        <ContentList
          items={filteredItems}
          onEdit={setEditingItem}
          onDelete={deleteItem}
          onPublish={publishItem}
          onArchive={archiveItem}
        />
      </div>
    </div>
  );
};

export default CmsPage;
