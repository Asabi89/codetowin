import { useState, useRef } from 'react';

/**
 * Hook pour gérer l'upload et la prévisualisation d'images via FileReader.
 * 
 * @param {string} initialUrl - L'URL de l'image par défaut
 * @returns {Object} { url, setUrl, inputRef, handleChange }
 */
export function useImagePreview(initialUrl = '') {
  const [url, setUrl] = useState(initialUrl);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return { url, setUrl, inputRef, handleChange };
}
