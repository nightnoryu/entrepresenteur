import {
  PrimitiveProperties,
} from '../../components/Ribbon/PropertiesPanel/PrimitivePropertiesPanel/PrimitivePropertiesPanelTypes';

export function getPrimitiveProperties(): PrimitiveProperties {
  return {
    strokeStyles: [
      'Solid',
      'Dashed',
      'Dot-dashed',
    ],
  };
}
