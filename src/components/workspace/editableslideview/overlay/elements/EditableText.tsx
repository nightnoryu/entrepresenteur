import React, { useRef } from 'react';
import { TextElement } from '../../../../../model/types';
import { getSelectedSVGElementProperties } from '../../../../../common/componentsFunctions';
import { dispatch } from '../../../../../state/editor';
import { selectElement, setTextValue, unselectElement } from '../../../../../model/actions';
import useDoubleClick from '../../../../../hooks/useDoubleClick';

type EditableTextProps = {
  element: TextElement;
  isSelected: boolean;
}

function EditableText({ element, isSelected }: EditableTextProps): JSX.Element {
  const selectedStyles = getSelectedSVGElementProperties(element, isSelected);

  const ref = useRef(null);
  useDoubleClick(ref, () => {
    dispatch(isSelected ? unselectElement : selectElement, element.id);
  }, () => {
    const newText = prompt('Enter new text');
    dispatch(setTextValue, {
      elementID: element.id,
      value: newText,
    });
  });


  return (
    <rect
      ref={ref}
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
