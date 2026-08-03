import React, { useState, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, UploadCloud, X, ChevronUp, ChevronDown } from 'lucide-react';
import { ModalShell, Toast } from '../ui';
import { SizeToggleGrid } from './SizeToggleGrid';
import { ColorSwatchGrid } from './ColorSwatchGrid';
import {
  ProductFormStepper,
  ProductFormFooter,
  ProductFormAlert,
} from './productFormShared';
import { PRODUCT_FORM_STEPS, formInputClass, formLabelClass } from './formConstants';
import { productFormSchema, type ProductFormValues, type ProductFormInput } from '../../lib/validations/product';
import type { AdminItem } from '../../types';
import { useUpdateProductMutation } from '../../hooks/useAdminProduct';
import { validateImageFile } from '../../lib/imageUtils';
import { toBackendPath } from '../../lib/request';
import { parseColorNames } from '../../lib/colorUtils';

export interface UpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AdminItem | null;
  onSave: (item: AdminItem) => void;
  onDelete?: () => void;
}

interface ImageItem {
  key: string;
  src: string;
  isNew: boolean;
  file?: File;
}

const newImageKey = () => `new_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ isOpen, onClose, item, onSave, onDelete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    () => (item?.size ? item.size.split(',').map((s) => s.trim()).filter(Boolean) : [])
  );
  const [imageItems, setImageItems] = useState<ImageItem[]>(() => {
    const paths = item?.images?.length ? item.images : item?.image ? [item.image] : [];
    return paths.map((p) => ({ key: p, src: p, isNew: false }));
  });
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const updateProductMutation = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: 'onTouched',
    defaultValues: {
      sku: item?.sku ?? '',
      title: item?.name ?? '',
      category: (item?.category ?? '').toLowerCase(),
      price: item?.price ?? 0,
      stock: item?.stock ?? 0,
      color: parseColorNames(item?.color),
      size: selectedSizes,
      description: item?.description ?? '',
    },
  });

  const color = useWatch({ control, name: 'color' }) ?? [];

  if (!isOpen || !item) return null;

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const processFiles = (filesList: FileList | File[]) => {
    setValidationError(null);
    const items: ImageItem[] = [];

    Array.from(filesList).forEach((file) => {
      const error = validateImageFile(file);
      if (error) {
        setValidationError(error);
        return;
      }
      items.push({ key: newImageKey(), src: URL.createObjectURL(file), isNew: true, file });
    });

    if (items.length > 0) {
      setImageItems((prev) => [...prev, ...items]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveImage = (key: string) => {
    setImageItems((prev) => {
      const removed = prev.find((it) => it.key === key);
      if (removed?.isNew) URL.revokeObjectURL(removed.src);
      return prev.filter((it) => it.key !== key);
    });
  };

  const moveImage = (idx: number, dir: -1 | 1) => {
    setImageItems((prev) => {
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const handleNext = async () => {
    setValidationError(null);
    if (currentStep === 1) {
      const valid = await trigger(['sku', 'title', 'price', 'stock']);
      if (!valid) return;
    }
    setCurrentStep((step) => Math.min(step + 1, PRODUCT_FORM_STEPS.length));
  };

  const handleBack = () => {
    setValidationError(null);
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const handleSave = handleSubmit((values) => {
    setValidationError(null);

    if (imageItems.length === 0) {
      setCurrentStep(3);
      setValidationError('Add at least one product image.');
      return;
    }

    const payload = new FormData();
    payload.append('title', values.title.trim());
    payload.append('sku', values.sku.trim());
    if (values.category) payload.append('category', values.category);
    payload.append('price', String(values.price));
    payload.append('stock_quantity', String(values.stock));
    if (values.description) payload.append('description', values.description);
    if (selectedSizes.length > 0) payload.append('size', selectedSizes.join(','));
    if (values.color.length > 0) payload.append('color', values.color.join(','));

    imageItems.forEach((it) => {
      if (it.isNew) {
        payload.append('images_order[]', 'new');
        if (it.file) payload.append('images[]', it.file);
      } else {
        payload.append('images_order[]', toBackendPath(it.src));
      }
    });

    updateProductMutation.mutate(
      { id: item.id, formData: payload },
      {
        onSuccess: (response) => {
          onSave({
            ...item,
            sku: values.sku,
            name: values.title,
            category: values.category,
            price: values.price,
            stock: values.stock,
            color: values.color.join(','),
            description: values.description,
            size: values.size.join(','),
          } as AdminItem);
          onClose();
        },
        onError: (err) => {
          setValidationError(err.message || 'Failed to update product.');
        },
      },
    );
  });

  const footer = (
    <ProductFormFooter
      currentStep={currentStep}
      totalSteps={PRODUCT_FORM_STEPS.length}
      onCancel={onClose}
      onBack={handleBack}
      onNext={handleNext}
      onSubmit={handleSave}
      onDelete={onDelete}
      isSubmitting={updateProductMutation.isPending}
      submitLabel="Save Changes"
      submitIcon={<Save size={18} />}
    />
  );

  const fieldError = (field: keyof ProductFormValues) =>
    errors[field] ? (
      <p className="text-xs text-danger mt-1">{errors[field]?.message}</p>
    ) : null;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Edit Product" footer={footer}>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <ProductFormStepper
          steps={PRODUCT_FORM_STEPS}
          currentStep={currentStep}
          onStepClick={(id) => {
            setValidationError(null);
            setCurrentStep(id);
          }}
        />

        <ProductFormAlert message={validationError} />

        {/* Step 1: Product Details */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={formLabelClass}>
                  Product Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className={formInputClass}
                />
                {fieldError('title')}
              </div>

              <div>
                <label className={formLabelClass}>SKU</label>
                <input
                  type="text"
                  value={item.sku}
                  disabled
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-xs font-semibold text-text-muted cursor-not-allowed"
                />
                <p className="text-xs text-text-muted mt-1">SKU cannot be changed.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={formLabelClass}>Category</label>
                <select {...register('category')} className={formInputClass}>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="kids">Kids</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className={formLabelClass}>Price (Rs.)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className={formInputClass}
                />
                {fieldError('price')}
              </div>

              <div>
                <label className={formLabelClass}>Stock</label>
                <input
                  type="number"
                  {...register('stock', { valueAsNumber: true })}
                  className={formInputClass}
                />
                {fieldError('stock')}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Options */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={formLabelClass}>Sizes</label>
                <SizeToggleGrid selectedSizes={selectedSizes} onToggle={handleToggleSize} />
              </div>

              <div>
              <label className={formLabelClass}>
                Colors {color.length > 0 && <span className="text-accent normal-case">— {color.join(', ')}</span>}
              </label>
              <ColorSwatchGrid
                value={color}
                onToggle={(name) =>
                  setValue('color', color.includes(name) ? color.filter((c) => c !== name) : [...color, name])
                }
              />
              </div>
            </div>

            <div>
              <label className={formLabelClass}>Description</label>
              <textarea
                rows={3}
                {...register('description')}
                placeholder="Write a short description about the product..."
                className={`${formInputClass} resize-none`}
              />
            </div>
          </div>
        )}

        {/* Step 3: Images */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${isDragging
                  ? 'border-accent bg-accent/10 scale-[1.01]'
                  : 'border-luxury-gold-light/40 bg-luxury-sand/20 hover:border-luxury-gold hover:bg-luxury-sand/40'
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center mx-auto mb-3">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm font-bold text-luxury-charcoal">
                Drag & drop new images here, or <span className="text-accent underline">browse</span>
              </p>
              <p className="text-[11px] text-text-muted mt-1">
                Supports JPG, PNG, WEBP, GIF (Max 10MB per image)
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-muted">
                  Images ({imageItems.length})
                </span>
                {imageItems.length > 1 && (
                  <span className="text-[10px] font-medium text-text-muted">
                    First image is the cover. Use arrows to reorder.
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {imageItems.map((it, idx) => (
                  <div
                    key={it.key}
                    className="relative group rounded-xl overflow-hidden border border-border bg-bg-secondary aspect-square"
                  >
                    <img
                      src={it.src}
                      alt={`${item.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-all" />

                    {idx === 0 && (
                      <span className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-accent shadow-sm">
                        Cover
                      </span>
                    )}
                    {it.isNew && (
                      <span className="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-emerald-600 shadow-sm">
                        New
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(it.key)}
                      className="absolute top-2 right-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full p-1.5 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                      title="Remove image"
                    >
                      <X size={12} />
                    </button>

                    {imageItems.length > 1 && (
                      <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          type="button"
                          onClick={() => moveImage(idx, -1)}
                          disabled={idx === 0}
                          className="bg-slate-900/70 hover:bg-slate-900 text-white rounded-md p-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Move up"
                        >
                          <ChevronUp size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(idx, 1)}
                          disabled={idx === imageItems.length - 1}
                          className="bg-slate-900/70 hover:bg-slate-900 text-white rounded-md p-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Move down"
                        >
                          <ChevronDown size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>

      {toastMessage && <Toast message={toastMessage} />}
    </ModalShell>
  );
};

export const UpdateItemModal = UpdateProductModal;
