import { PrimitiveElement } from '../model/types';

export function primitiveElementViewBox(element: PrimitiveElement): string {
  return `0 0 ${element.dimensions.width} ${element.dimensions.height}`;
}
