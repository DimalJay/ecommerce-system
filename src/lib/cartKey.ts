export const getItemKey = (item: { product: { id: number }; selectedSize: string; selectedColor: string }) =>
  `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;
