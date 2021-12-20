import { default as appStore } from '../store';
import { Presentation } from '../../model/types';
import { RootState } from '../reducers';

function selectPresentation(state: RootState): Presentation {
  return state.presentation;
}

function listener(store: typeof appStore): () => void {
  let currentValue: Presentation | null = null;

  return () => {
    const previousValue = currentValue;
    currentValue = selectPresentation(store.getState());

    if (previousValue !== null && previousValue !== currentValue) {
      console.log('Presentation changed');
      // Save history here
    }
  };
}

export default listener;
