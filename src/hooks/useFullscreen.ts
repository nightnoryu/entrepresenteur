import React, { useEffect } from 'react';

function useFullscreen(
  ref: React.RefObject<HTMLElement>,
  isFullscreen: boolean,
  onFullscreenExit: () => void,
): void {
  useEffect(() => {
    const view = ref.current;

    if (view) {
      if (isFullscreen) {
        if (!document.fullscreenElement) {
          view.requestFullscreen().catch(error => alert(error.message));
        }
      }
    }

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onFullscreenExit();
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [isFullscreen]);
}

export default useFullscreen;
