/**
 * Get the image URL for a bull based on breed and coat color
 */

// Available images in public/images/
const BULL_IMAGES = [
  'angus-colorado.jpg',
  'angus-negro.jpg',
  'bradford-colorado.jpg',
  'bradford-negro.jpeg',
] as const;

/**
 * Generate image path for a bull based on breed and coat color
 * If the specific combination doesn't exist, returns a random image
 */
export function getBullImageUrl(breed: string, coatColor: string): string {
  const breedLower = breed.toLowerCase();
  const colorLower = coatColor.toLowerCase();

  // Try .jpg first
  const imageNameJpg = `${breedLower}-${colorLower}.jpg`;
  if (BULL_IMAGES.includes(imageNameJpg as any)) {
    return `/images/${imageNameJpg}`;
  }

  // Try .jpeg
  const imageNameJpeg = `${breedLower}-${colorLower}.jpeg`;
  if (BULL_IMAGES.includes(imageNameJpeg as any)) {
    return `/images/${imageNameJpeg}`;
  }

  // If not found, return a random image (deterministic based on breed/color)
  const hash = breedLower.charCodeAt(0) + colorLower.charCodeAt(0);
  const randomIndex = hash % BULL_IMAGES.length;
  return `/images/${BULL_IMAGES[randomIndex]}`;
}
