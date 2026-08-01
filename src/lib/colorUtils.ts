export const PREDEFINED_COLORS: { name: string; hex: string }[] = [
  { name: 'Black', hex: '#1c1917' },
  { name: 'White', hex: '#f5f5f4' },
  { name: 'Beige', hex: '#e7d8c9' },
  { name: 'Grey', hex: '#a8a29e' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Green', hex: '#059669' },
  { name: 'Olive', hex: '#6b7f3f' },
  { name: 'Brown', hex: '#7c4a2d' },
  { name: 'Pink', hex: '#f9a8d4' },
  { name: 'Maroon', hex: '#8a1c2e' },
];

export const parseColorNames = (value?: string | null): string[] =>
  (value ?? '').split(',').map((s) => s.trim()).filter(Boolean);

export const parseSizes = (value?: string | null): string[] =>
  (value ?? '').split(',').map((s) => s.trim()).filter(Boolean);

const hashHue = (name: string): number => {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) % 360;
  }
  return h;
};

/**
 * Maps a color name (as stored by the admin, e.g. "Blue") to a hex value
 * for the storefront swatch pickers. Unknown names get a stable hash-derived
 * HSL color so they still render as a swatch.
 */
export const colorNameToHex = (name: string): string => {
  const found = PREDEFINED_COLORS.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  if (found) return found.hex;
  return `hsl(${hashHue(name)} 45% 60%)`;
};
