import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.showModal();
    return () => { dialog?.close(); trigger?.focus(); };
  }, []);
  return <dialog ref={ref} aria-labelledby="dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="dialog-inner">
      <button className="icon-button dialog-close" aria-label="Close dialog" onClick={onClose}><Icon name="close" /></button>
      <span className="eyebrow">YOUR WORKSPACE</span>
      <h2 id="dialog-title">{title}</h2>
      {children}
      <button className="primary-button" onClick={onClose}>Back to workspace <Icon name="arrow" size={17} /></button>
    </div>
  </dialog>;
}
