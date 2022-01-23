import React, { useCallback } from 'react';

type Handler = (event: React.MouseEvent) => void;

function useDoubleClick(handler: Handler): Handler {
  return useCallback((event: React.MouseEvent) => {
    if (event.detail % 2 === 0) {
      handler(event);
    }
  }, [handler]);
}

export default useDoubleClick;
