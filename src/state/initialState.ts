import { ColorScheme, Editor } from '../model/types';
import { createEditor, createNewPresentation, tryMapStringToColorScheme } from '../model/modelUtils';

function getInitialState(): Editor {
  let colorScheme = ColorScheme.LIGHT;
  const colorSchemeValue = localStorage.getItem('colorScheme');
  if (colorSchemeValue !== null) {
    colorScheme = tryMapStringToColorScheme(colorSchemeValue);
  }

  return createEditor(createNewPresentation(), colorScheme);
}

export default getInitialState;
