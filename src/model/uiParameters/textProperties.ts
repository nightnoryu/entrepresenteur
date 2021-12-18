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
    sizes: [
      13,
      15,
      17,
      19,
      22,
      24,
      27,
      31,
      34,
      39,
      44,
      49,
      55,
      62,
      70,
    ],
  };
}
