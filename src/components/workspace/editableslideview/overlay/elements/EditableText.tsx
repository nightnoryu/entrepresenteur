import React from 'react';
import { TextElement } from '../../../../../model/types';
import { getSelectedSVGElementProperties } from '../../../../../common/componentsFunctions';

type EditableTextProps = {
  element: TextElement;
  isSelected: boolean;
}

function EditableText({ element, isSelected }: EditableTextProps): JSX.Element {
  const selectedStyles = getSelectedSVGElementProperties(element, isSelected);

  return (
    <rect
      x={element.position.x}
      y={element.position.y}
      width={element.dimensions.width}
      height={element.dimensions.height}
      rx="2"
      ry="2"
      {...selectedStyles}
    />
  );
}

export default EditableText;
