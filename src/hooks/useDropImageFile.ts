import React, { useCallback } from 'react';
import { loadFileAsImage } from '../common/fileUtils';

type OnDropHandler = (image: HTMLImageElement) => void;

function useDropImageFile(
  handler: OnDropHandler,
  errorHandler: (errorMessageID: string) => void,
): (event: React.DragEvent<SVGSVGElement>) => void {
  return useCallback((event: React.DragEvent<SVGSVGElement>) => {
    event.preventDefault();

    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      const item = event.dataTransfer.items[0];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          loadFileAsImage(file)
            .then(image => handler(image))
            .catch(errorMessageID => errorHandler(errorMessageID));
        }
      }

    } else if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file) {
        loadFileAsImage(file)
          .then(image => handler(image))
          .catch(errorMessageID => errorHandler(errorMessageID));
      }
    }
  }, [handler]);
}

export default useDropImageFile;
