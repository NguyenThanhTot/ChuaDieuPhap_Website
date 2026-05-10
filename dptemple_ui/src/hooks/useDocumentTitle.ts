import { useEffect } from 'react';

/**
 * Hook to update document title dynamically
 * @param title - The title to set for the page
 */
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    
    // Cleanup: restore original title when component unmounts
    return () => {
      document.title = 'Chùa Diệu Pháp';
    };
  }, [title]);
};
