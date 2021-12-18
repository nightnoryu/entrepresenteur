import { TextProperties } from '../../components/Ribbon/PropertiesPanel/TextPropertiesPanel/TextPropertiesPanelTypes';

export function getTextProperties(): TextProperties {
  return {
    fonts: [
      'Arial',
      'Verdana',
      'Comic Sans MS',
      'Consolas',
      'Calibri',
    ],
  };
}
