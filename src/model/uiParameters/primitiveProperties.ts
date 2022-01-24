import {
  PrimitiveProperties,
} from '../../components/Ribbon/PropertiesPanel/PrimitivePropertiesPanel/PrimitivePropertiesPanelTypes';

function range(size: number, startAt = 0): number[] {
  return [...Array(size).keys()].map(key => key + startAt);
}

export function getPrimitiveProperties(): PrimitiveProperties {
  return {
    strokeStyles: [
      'primitive.stroke_style.solid',
      'primitive.stroke_style.dashed',
      'primitive.stroke_style.dot_dashed',
    ],
    strokeWidths: range(5, 1),
  };
}
