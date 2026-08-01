import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { ModalShell } from '../ui';
import { SizeToggleGrid } from './SizeToggleGrid';
import { ColorSwatchGrid } from './ColorSwatchGrid';
import { PRODUCT_FORM_STEPS, formInputClass, formLabelClass } from './formConstants';
import {
  ProductFormStepper,
  ProductFormFooter,
  ProductFormAlert,
} from './productFormShared';
import type { AdminItem } from '../../types';
import { useUpdateProductMutation } from '../../hooks/useAdminProduct';
import { useToast } from '../../hooks/useToast';

export interface UpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AdminItem | null;
  onSave: (item: AdminItem) => void;
}

export const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ isOpen, onClose, item, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    () => (item?.size ? item.size.split(',').map((s) => s.trim()).filter(Boolean) : [])
  );
  const [formData, setFormData] = useState<Partial<AdminItem>>(() => item ?? {});
  const [validationError, setValidationError] = useState<string | null>(null);
  const { triggerToast } = useToast();
  const updateProductMutation = useUpdateProductMutation();

  if (!isOpen || !item) return null;

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleNext = () => {
    setValidationError(null);
    if (currentStep === 1 && !formData.name?.trim()) {
      setValidationError('Product name is required.');
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, PRODUCT_FORM_STEPS.length));
  };

  const handleBack = () => {
    setValidationError(null);
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const handleSave = () => {
    setValidationError(null);

    if (!formData.name?.trim()) {
      setCurrentStep(1);
      setValidationError('Product name is required.');
      return;
    }

    const payload = new FormData();
    if (formData.name?.trim()) payload.append('title', formData.name.trim());
    if (formData.category?.trim()) payload.append('category', formData.category.trim());
    if (formData.price !== undefined && formData.price !== null) payload.append('price', String(formData.price));
    if (formData.stock !== undefined && formData.stock !== null) payload.append('stock_quantity', String(formData.stock));
    if (formData.description !== undefined) payload.append('description', formData.description);
    if (selectedSizes.length > 0) payload.append('size', selectedSizes.join(','));
    if (formData.color?.trim()) payload.append('color', formData.color.trim());

    updateProductMutation.mutate(
      { id: item.id, formData: payload },
      {
        onSuccess: (response) => {
          triggerToast(`Product "${response.data.title}" updated successfully!`);
          onSave(formData as AdminItem);
          onClose();
        },
        onError: (err) => {
          setValidationError(err.message || 'Failed to update product.');
        },
      },
    );
  };

  const footer = (
    <ProductFormFooter
      currentStep={currentStep}
      totalSteps={PRODUCT_FORM_STEPS.length}
      onCancel={onClose}
      onBack={handleBack}
      onNext={handleNext}
      onSubmit={handleSave}
      isSubmitting={updateProductMutation.isPending}
      submitLabel="Save Changes"
      submitIcon={<Save size={18} />}
    />
  );

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Edit Product" footer={footer}>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <ProductFormStepper steps={PRODUCT_FORM_STEPS} currentStep={currentStep} />

        <ProductFormAlert message={validationError} />

        {/* Step 1: Product Details */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={formLabelClass}>
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={formInputClass}
                />
              </div>

              <div>
                <label className={formLabelClass}>SKU</label>
                <input
                  type="text"
                  value={formData.sku || ''}
                  disabled
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-xs font-semibold text-text-muted cursor-not-allowed"
                />
                <p className="text-xs text-text-muted mt-1">SKU cannot be changed.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={formLabelClass}>Category</label>
                <select
                  value={formData.category?.toLowerCase() || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={formInputClass}
                >
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
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className={formInputClass}
                />
              </div>

              <div>
                <label className={formLabelClass}>Stock</label>
                <input
                  type="number"
                  value={formData.stock || 0}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
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
                <SizeToggleGrid selectedSizes={selectedSizes} onToggle={handleToggleSize} />
              </div>

              <div>
                <label className={formLabelClass}>
                  Color {formData.color && <span className="text-accent normal-case">— {formData.color}</span>}
                </label>
                <ColorSwatchGrid value={formData.color || ''} onSelect={(name) => setFormData({ ...formData, color: name })} />
              </div>
            </div>

            <div>
              <label className={formLabelClass}>Description</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Write a short description about the product..."
                className={`${formInputClass} resize-none`}
              />
            </div>
          </div>
        )}

        {/* Step 3: Images */}
        {currentStep === 3 && (
          <div>
            <label className={formLabelClass}>Product Image</label>
            <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-border group cursor-pointer">
              <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
                <Upload size={28} className="mb-2" />
                <span className="font-medium">Change Image</span>
              </div>
            </div>
            <p className="text-xs text-text-muted mt-2">Image replacement is not supported yet.</p>
          </div>
        )}
      </form>
    </ModalShell>
  );
};

export const UpdateItemModal = UpdateProductModal;
