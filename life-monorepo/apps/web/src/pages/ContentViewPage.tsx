import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useContentStore } from '../entities/content/model/store';
import { ArrowLeft } from '../shared/ui/icons';
import './ContentViewPage.css';

export const ContentViewPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug } = useContentStore();
  
  const content = slug ? getBySlug(slug) : undefined;

  if (!content) {
    return <Navigate to="/cms" replace />;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="content-view-page">
      <header className="content-view-header">
        <Link to="/cms" className="back-link">
          <ArrowLeft /> Back to CMS
        </Link>
      </header>

      <article className="content-article">
        <div className="content-article-meta">
          <span className="content-type-badge">{content.type}</span>
          <span className="content-date">{formatDate(content.publishedAt || content.createdAt)}</span>
        </div>

        <h1 className="content-article-title">{content.title}</h1>

        {content.tags.length > 0 && (
          <div className="content-article-tags">
            {content.tags.map((tag) => (
              <span key={tag} className="article-tag">#{tag}</span>
            ))}
          </div>
        )}

        <div className="content-article-body">
          {content.content.split('\n').map((paragraph, index) => (
            paragraph.trim() ? <p key={index}>{paragraph}</p> : null
          ))}
        </div>

        <footer className="content-article-footer">
          <p>Written by {content.authorName}</p>
        </footer>
      </article>
    </div>
  );
};

export default ContentViewPage;
