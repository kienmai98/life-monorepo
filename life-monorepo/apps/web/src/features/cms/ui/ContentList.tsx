import React, { useState } from 'react';
import type { ContentItem } from '../../../entities/content/model/types';

interface ContentListProps {
  items: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onArchive: (id: string) => void;
}

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'badge-draft' },
  published: { label: 'Published', className: 'badge-published' },
  archived: { label: 'Archived', className: 'badge-archived' },
};

const TYPE_ICONS: Record<string, string> = {
  page: '📄',
  post: '📝',
  faq: '❓',
  announcement: '📢',
};

export const ContentList: React.FC<ContentListProps> = ({
  items,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (items.length === 0) {
    return (
      <div className="content-list-empty">
        <p>No content items found.</p>
        <p className="text-muted">Create your first item to get started.</p>
      </div>
    );
  }

  return (
    <div className="content-list">
      {items.map((item) => {
        const status = STATUS_BADGES[item.status];
        const isExpanded = expandedId === item.id;

        return (
          <div key={item.id} className={`content-item ${isExpanded ? 'expanded' : ''}`}>
            <div className="content-item-header" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
              <span className="content-item-icon">{TYPE_ICONS[item.type]}</span>
              <div className="content-item-info">
                <h4 className="content-item-title">{item.title}</h4>
                <p className="content-item-meta">
                  {item.type} • {formatDate(item.updatedAt)} • by {item.authorName}
                </p>
              </div>
              <span className={`badge ${status.className}`}>{status.label}</span>
            </div>

            {isExpanded && (
              <div className="content-item-expanded">
                <p className="content-item-excerpt">{item.excerpt}</p>
                
                {item.tags.length > 0 && (
                  <div className="content-item-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag-small">#{tag}</span>
                    ))}
                  </div>
                )}

                <div className="content-item-actions">
                  <button onClick={() => onEdit(item)} className="btn btn-sm btn-secondary">
                    Edit
                  </button>
                  
                  {item.status !== 'published' && (
                    <button onClick={() => onPublish(item.id)} className="btn btn-sm btn-success">
                      Publish
                    </button>
                  )}
                  
                  {item.status !== 'archived' && (
                    <button onClick={() => onArchive(item.id)} className="btn btn-sm btn-warning">
                      Archive
                    </button>
                  )}
                  
                  <button onClick={() => onDelete(item.id)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContentList;
