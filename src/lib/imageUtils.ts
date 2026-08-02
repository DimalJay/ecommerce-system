/**
 * Utilities for image validation and file handling.
 */

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const MAX_IMAGE_FILE_SIZE = 2 * 1024 * 1024; // 2MB

/**
 * Validates a single image file against the allowed formats and size limit.
 * Returns an error message, or null if the file is valid.
 */
export const validateImageFile = (file: File): string | null => {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type.toLowerCase())) {
    return `"${file.name}" is not a valid image format (jpg, png, webp, gif).`;
  }
  if (file.size > MAX_IMAGE_FILE_SIZE) {
    return `"${file.name}" exceeds max allowed file size of 2MB.`;
  }
  return null;
};
