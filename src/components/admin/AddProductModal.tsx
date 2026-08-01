import React, { useState, useRef } from 'react';
import { Plus, UploadCloud, X } from 'lucide-react';
import { ModalShell } from '../ui';
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

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { triggerToast } = useToast();
  const addProductMutation = useAddProductMutation();

  const [currentStep, setCurrentStep] = useState(1);

  // Form states
  const [sku, setSku] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [color, setColor] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  // Drag & drop & file upload states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setCurrentStep(1);
    setSku('');
    setTitle('');
    setCategory('');
    setPrice('');
    setStockQuantity('');
    setColor('');
    setSelectedSizes([]);
    setDescription('');
    setSelectedFiles([]);
    setFilePreviews([]);
    setValidationError(null);
  };

  const handleCloseModal = () => {
    resetForm();
    onClose();
  };

  const processFiles = (filesList: FileList | File[]) => {
    setValidationError(null);
    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    Array.from(filesList).forEach((file) => {
      if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
        setValidationError(`"${file.name}" is not a valid image format (jpg, png, webp, gif).`);
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setValidationError(`"${file.name}" exceeds max allowed file size of 2MB.`);
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
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setValidationError(null);
    if (currentStep === 1 && (!sku.trim() || !title.trim())) {
      setValidationError('SKU and Title are required fields.');
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, PRODUCT_FORM_STEPS.length));
  };

  const handleBack = () => {
    setValidationError(null);
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const handleSubmit = () => {
    setValidationError(null);

    if (!sku.trim() || !title.trim()) {
      setCurrentStep(1);
      setValidationError('SKU and Title are required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('sku', sku.trim());
    formData.append('title', title.trim());

    if (description.trim()) formData.append('description', description.trim());
    if (color.trim()) formData.append('color', color.trim());
    if (selectedSizes.length > 0) formData.append('size', selectedSizes.join(','));
    if (price) formData.append('price', price);
    if (stockQuantity) formData.append('stock_quantity', stockQuantity);
    if (category.trim()) formData.append('category', category.trim());

    selectedFiles.forEach((file) => {
      formData.append('images[]', file);
    });

    addProductMutation.mutate(formData, {
      onSuccess: (response) => {
        triggerToast(`Product "${response.data.title}" created successfully!`);

        if (onSave) {
          onSave({
            name: title,
            sku,
            category,
            price: parseFloat(price) || 0,
            stock: parseInt(stockQuantity) || 0,
            image: filePreviews[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=150&q=80',
            selectedSizes,
            description,
          });
        }

        handleCloseModal();
      },
      onError: (err) => {
        setValidationError(err.message || 'Failed to create product.');
      },
    });
  };

  const footer = (
    <ProductFormFooter
      currentStep={currentStep}
      totalSteps={PRODUCT_FORM_STEPS.length}
      onCancel={handleCloseModal}
      onBack={handleBack}
      onNext={handleNext}
      onSubmit={handleSubmit}
      isSubmitting={addProductMutation.isPending}
      submitLabel="Save Product"
      submitIcon={<Plus size={18} />}
    />
  );

  return (
    <ModalShell isOpen={isOpen} onClose={handleCloseModal} title="Add New Product" footer={footer}>
      <ProductFormStepper steps={PRODUCT_FORM_STEPS} currentStep={currentStep} />

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
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. TSHIRT-BLK-M"
                className={formInputClass}
              />
            </div>

            <div>
              <label className={formLabelClass}>
                Title / Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Classic Black T-Shirt"
                className={formInputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className={formLabelClass}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={formInputClass}
              >
                <option value="">Select Category</option>
                <option value="Apparel">Apparel</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
                <option value="Accessories">Accessories</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className={formLabelClass}>Price (Rs.)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="19.99"
                className={formInputClass}
              />
            </div>

            <div>
              <label className={formLabelClass}>Stock Quantity</label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="50"
                className={formInputClass}
              />
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
                selectedSizes={selectedSizes}
                onToggle={(size) => {
                  setSelectedSizes((prev) =>
                    prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                  );
                }}
              />
            </div>

            <div>
              <label className={formLabelClass}>
                Color {color && <span className="text-accent normal-case">— {color}</span>}
              </label>
              <ColorSwatchGrid value={color} onSelect={setColor} />
            </div>
          </div>

          <div>
            <label className={formLabelClass}>Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              Supports JPG, PNG, WEBP, GIF (Max 2MB per image)
            </p>
          </div>

          {filePreviews.length > 0 && (
            <div className="mt-4 space-y-2">
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
    </ModalShell>
  );
};

export const AddItemModal = AddProductModal;
