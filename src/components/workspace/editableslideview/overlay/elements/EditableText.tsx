import React, { useEffect, useRef } from 'react';
import { TextElement } from '../../../../../model/types';
import { getSelectedSVGElementProperties } from '../../../../../common/componentsFunctions';
import { dispatch } from '../../../../../state/editor';
import { moveElement, selectElement, setTextValue, unselectElement } from '../../../../../model/actions';
import useDoubleClick from '../../../../../hooks/useDoubleClick';
import useDragAndDrop from '../../../../../hooks/useDragAndDrop';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';

type EditableTextProps = {
  element: TextElement;
  isSelected: boolean;
}

function EditableText({ element, isSelected }: EditableTextProps): JSX.Element {
  const selectedStyles = getSelectedSVGElementProperties(element, isSelected);

  const ref = useRef(null);
  useDoubleClick(ref, () => {
    if (!isSelected) {
      dispatch(selectElement, element.id);
    }
  }, () => {
    const newText = prompt('Enter new text');
    dispatch(setTextValue, {
      elementID: element.id,
      value: newText,
    });
  });

  useOnClickOutside(ref, () => {
    if (isSelected) {
      dispatch(unselectElement, element.id);
    }
  });

  const position = useDragAndDrop(ref, element.position);
  useEffect(() => {
    dispatch(moveElement, {
      elementID: element.id,
      positionDiff: {
        x: position.x - element.position.x,
        y: position.y - element.position.y,
      },
    });
  }, [position]);

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
