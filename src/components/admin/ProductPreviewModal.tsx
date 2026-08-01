import React, { useState } from 'react';
import { ExternalLink, Ruler, Palette, Layers, Tag } from 'lucide-react';
import { ModalShell } from '../ui';
import { ProductImage } from '../ui';
import type { AdminItem } from '../../types';

export interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AdminItem | null;
}

const STATUS_STYLES: Record<AdminItem['status'], string> = {
  'In Stock': 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  'Low Stock': 'bg-amber-50 text-amber-700 border-amber-200/80',
  'Out of Stock': 'bg-rose-50 text-rose-700 border-rose-200/80',
};

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({ isOpen, onClose, item }) => {
  const images = item?.images?.length ? item.images : item?.image ? [item.image] : [];
  const [activeImage, setActiveImage] = useState(0);

  if (!isOpen || !item) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Product Preview"
      maxWidth="max-w-3xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 text-text-secondary hover:bg-bg-secondary rounded-lg font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
          <a
            href={`/product/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-elevated px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            <ExternalLink size={16} />
            <span>View on Store</span>
          </a>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="relative bg-bg-secondary rounded-2xl overflow-hidden aspect-square">
            <ProductImage
              src={images[activeImage] ?? item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <span
              className={`absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border bg-white/90 backdrop-blur-sm ${STATUS_STYLES[item.status]}`}
            >
              {item.status}
            </span>
            {images.length > 1 && (
              <span className="absolute bottom-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-slate-900/70 backdrop-blur-sm">
                {activeImage + 1} / {images.length}
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                    idx === activeImage ? 'border-accent ring-2 ring-accent/30' : 'border-transparent hover:border-border'
                  }`}
                >
                  <ProductImage src={img} alt={`${item.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-black text-accent uppercase tracking-widest block mb-1">
              {item.category}
            </span>
            <h3 className="text-xl font-bold text-text-primary leading-snug">{item.name}</h3>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-accent">Rs. {item.price.toFixed(2)}</span>
            <span className="text-xs text-text-muted">{item.stock} units in stock</span>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-border">
            <div className="flex items-center gap-3 text-sm">
              <Tag size={14} className="text-text-muted shrink-0" />
              <span className="text-text-muted text-xs uppercase tracking-wider w-20 shrink-0">SKU</span>
              <span className="font-mono text-xs font-semibold text-text-primary">{item.sku}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Layers size={14} className="text-text-muted shrink-0" />
              <span className="text-text-muted text-xs uppercase tracking-wider w-20 shrink-0">Category</span>
              <span className="text-xs font-semibold text-text-primary">{item.category}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Palette size={14} className="text-text-muted shrink-0" />
              <span className="text-text-muted text-xs uppercase tracking-wider w-20 shrink-0">Color</span>
              <span className="text-xs font-semibold text-text-primary">{item.color ?? '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Ruler size={14} className="text-text-muted shrink-0" />
              <span className="text-text-muted text-xs uppercase tracking-wider w-20 shrink-0">Size</span>
              <span className="text-xs font-semibold text-text-primary">{item.size ?? '—'}</span>
            </div>
          </div>

          {item.description && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1.5">Description</p>
              <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
            </div>
          )}
        </div>
      </div>
    </ModalShell>
  );
};
