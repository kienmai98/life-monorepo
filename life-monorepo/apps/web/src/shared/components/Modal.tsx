import React from 'react';
import './Modal.css';

export interface ModalProps {
  /** Modal visibility */
  isOpen: boolean;
  /** Modal title */
  title?: string;
  /** Modal children */
  children: React.ReactNode;
  /** Close handler */
  onClose: () => void;
  /** Footer content */
  footer?: React.ReactNode;
  /** Prevent closing when clicking overlay */
  preventOverlayClose?: boolean;
}

/**
 * Reusable Modal component
 * 
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={closeModal}
 *   title="Add Transaction"
 *   footer={<Button onClick={submit}>Save</Button>}
 * >
 *   <Form />
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  footer,
  preventOverlayClose = false,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !preventOverlayClose) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true">
        {(title) && (
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button
              className="modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}
        
        <div className="modal__body">{children}</div>
        
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
