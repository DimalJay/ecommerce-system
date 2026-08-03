import React, { useState, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, UploadCloud, X } from 'lucide-react';
import { ModalShell, Toast } from '../ui';
import { SizeToggleGrid } from './SizeToggleGrid';
import { ColorSwatchGrid } from './ColorSwatchGrid';
import { PRODUCT_FORM_STEPS, formInputClass, formLabelClass } from './formConstants';
import {
  ProductFormStepper,
  ProductFormFooter,
  ProductFormAlert,
} from './productFormShared';
import { useAddProductMutation } from '../../hooks/useAdminProduct';
import { useToast } from '../../hooks/useToast';
import { validateImageFile } from '../../lib/imageUtils';
import { productFormSchema, type ProductFormValues, type ProductFormInput } from '../../lib/validations/product';

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (item: {
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    selectedSizes: string[];
    description: string;
  }) => void;
}

const DEFAULT_VALUES: ProductFormValues = {
  sku: '',
  title: '',
  category: '',
  price: 0,
  stock: 0,
  color: [],
  size: [],
  description: '',
};

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toastMessage, triggerToast } = useToast();
  const addProductMutation = useAddProductMutation();

  const [currentStep, setCurrentStep] = useState(1);

  // Drag & drop & file upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const color = useWatch({ control, name: 'color' }) ?? [];
  const size = useWatch({ control, name: 'size' }) ?? [];

  if (!isOpen) return null;

  const handleCloseModal = () => {
    reset(DEFAULT_VALUES);
    setCurrentStep(1);
    setSelectedFiles([]);
    setFilePreviews([]);
    setValidationError(null);
    onClose();
  };

  const handleToggleColor = (name: string) => {
    setValue('color', color.includes(name) ? color.filter((c) => c !== name) : [...color, name]);
  };

  const handleToggleSize = (item: string) => {
    setValue('size', size.includes(item) ? size.filter((s) => s !== item) : [...size, item]);
  };

  const processFiles = (filesList: FileList | File[]) => {
    setValidationError(null);
    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    Array.from(filesList).forEach((file) => {
      const error = validateImageFile(file);
      if (error) {
        setValidationError(error);
        return;
      }
      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      setFilePreviews((prev) => [...prev, ...validPreviews]);
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

  const handleRemoveFile = (index: number) => {
    URL.revokeObjectURL(filePreviews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
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

    if (selectedFiles.length === 0) {
      setCurrentStep(3);
      setValidationError('Add at least one product image.');
      return;
    }

    const formData = new FormData();
    formData.append('sku', values.sku.trim());
    formData.append('title', values.title.trim());

    if (values.description.trim()) formData.append('description', values.description.trim());
    if (values.color.length > 0) formData.append('color', values.color.join(','));
    if (values.size.length > 0) formData.append('size', values.size.join(','));
    if (values.price > 0) formData.append('price', String(values.price));
    if (values.stock > 0) formData.append('stock_quantity', String(values.stock));
    if (values.category.trim()) formData.append('category', values.category.trim());

    selectedFiles.forEach((file) => {
      formData.append('images[]', file);
    });

    addProductMutation.mutate(formData, {
      onSuccess: (response) => {
        triggerToast(`Product "${response.data.title}" created successfully!`);

        if (onSave) {
          onSave({
            name: values.title,
            sku: values.sku,
            category: values.category,
            price: values.price,
            stock: values.stock,
            image: filePreviews[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=150&q=80',
            selectedSizes: values.size,
            description: values.description,
          });
        }

        handleCloseModal();
      },
      onError: (err) => {
        setValidationError(err.message || 'Failed to create product.');
      },
    });
  });

  const fieldError = (field: keyof ProductFormValues) =>
    errors[field] ? (
      <p className="text-xs text-danger mt-1">{errors[field]?.message}</p>
    ) : null;

  const footer = (
    <ProductFormFooter
      currentStep={currentStep}
      totalSteps={PRODUCT_FORM_STEPS.length}
      onCancel={handleCloseModal}
      onBack={handleBack}
      onNext={handleNext}
      onSubmit={handleSave}
      isSubmitting={addProductMutation.isPending}
      submitLabel="Save Product"
      submitIcon={<Plus size={18} />}
    />
  );

  return (
    <ModalShell isOpen={isOpen} onClose={handleCloseModal} title="Add New Product" footer={footer}>
      <ProductFormStepper
        steps={PRODUCT_FORM_STEPS}
        currentStep={currentStep}
      />

      <ProductFormAlert message={validationError} />

      {/* Step 1: Product Details */}
      {currentStep === 1 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={formLabelClass}>
                SKU <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                {...register('sku')}
                placeholder="e.g. TSHIRT-BLK-M"
                className={formInputClass}
              />
              {fieldError('sku')}
            </div>

            <div>
              <label className={formLabelClass}>
                Title / Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g. Classic Black T-Shirt"
                className={formInputClass}
              />
              {fieldError('title')}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className={formLabelClass}>Category</label>
              <select {...register('category')} className={formInputClass}>
                <option value="">Select Category</option>
                <option value="apparel">Apparel</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className={formLabelClass}>Price (Rs.)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('price')}
                placeholder="19.99"
                className={formInputClass}
              />
              {fieldError('price')}
            </div>

            <div>
              <label className={formLabelClass}>Stock Quantity</label>
              <input
                type="number"
                min="0"
                {...register('stock')}
                placeholder="50"
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
              <SizeToggleGrid
                selectedSizes={size}
                onToggle={handleToggleSize}
              />
            </div>

            <div>
              <label className={formLabelClass}>
                Colors {color.length > 0 && <span className="text-accent normal-case">— {color.join(', ')}</span>}
              </label>
              <ColorSwatchGrid
                value={color}
                onToggle={handleToggleColor}
              />
            </div>
          </div>

          <div>
            <label className={formLabelClass}>Description</label>
            <textarea
              rows={3}
              {...register('description')}
              placeholder="Write a detailed description about the product..."
              className={`${formInputClass} resize-none`}
            />
          </div>
        </div>
      )}

      {/* Step 3: Images */}
      {currentStep === 3 && (
        <div>
          <label className={formLabelClass}>Product Images (Drag & Drop)</label>
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
              Drag & drop product images here, or <span className="text-accent underline">browse</span>
            </p>
            <p className="text-[11px] text-text-muted mt-1">
              Supports JPG, PNG, WEBP, GIF (Max 10MB per image)
            </p>
          </div>

          {filePreviews.length > 0 && (
            <div className="mt-2 space-y-2">
              <span className="text-xs font-medium text-text-muted">
                Selected Images ({filePreviews.length})
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {filePreviews.map((previewUrl, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-luxury-gold-light/30 bg-slate-100 aspect-square">
                    <img src={previewUrl} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(idx);
                      }}
                      className="absolute top-1 right-1 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full p-1 transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                      title="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {toastMessage && <Toast message={toastMessage} />}
    </ModalShell>
  );
};

export const AddItemModal = AddProductModal;
