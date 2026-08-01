import { PREDEFINED_COLORS } from '../components/admin/colorConstants';

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
