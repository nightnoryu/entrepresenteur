import { TextProperties } from '../../components/Ribbon/PropertiesPanel/TextPropertiesPanel/TextPropertiesPanelTypes';
import { TextFont } from '../types';
import { mapFontToString } from '../modelUtils';

export function getTextProperties(): TextProperties {
  return {
    fonts: [
      TextFont.SERIF,
      // TextFont.SANS_SERIF,
      // TextFont.MONOSPACE,
    ].map(mapFontToString),
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
