import { useEffect } from 'react';

function useConfirmLeaving(): void {
  const handleBeforeUnload = (e: Event) => {
    e.preventDefault();
    return e.returnValue = Boolean('');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });
}

export default useConfirmLeaving;
