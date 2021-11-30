import React, { Dispatch, useEffect, useRef } from 'react';
import { TextElement } from '../../../../../model/types';
import { getSelectedSVGElementProperties } from '../../../../../common/componentsFunctions';
import useDoubleClick from '../../../../../hooks/useDoubleClick';
import useDragAndDrop from '../../../../../hooks/useDragAndDrop';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';
import useEventListener from '../../../../../hooks/useEventListener';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../../state/actions';
import { UUID } from '../../../../../model/uuid';
import Action from '../../../../../state/actions/actions';
import { setTextValue } from '../../../../../state/actions/actionCreators';

type EditableTextProps = {
  element: TextElement;
  isSelected: boolean;
  setTextValue: (elementID: UUID, value: string) => void,
}

function EditableText({ element, isSelected, setTextValue }: EditableTextProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectElement, unselectElement, moveElement } = bindActionCreators(actionCreators, dispatch);

  const selectedStyles = getSelectedSVGElementProperties(element, isSelected);

  const ref = useRef(null);
  useDoubleClick(ref, () => {
    const newText = prompt('Enter new text') ?? '';
    setTextValue(element.id, newText);
  });

  useEventListener('mousedown', (event: Event) => {
    if ((event as MouseEvent).button !== 0) {
      return;
    }

    if (!isSelected) {
      selectElement(element.id);
    }
  }, ref);

  useOnClickOutside(ref, () => {
    if (isSelected) {
      unselectElement(element.id);
    }
  });

  const position = useDragAndDrop(ref, element.position);
  useEffect(() => {
    moveElement({
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

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    setTextValue: (elementID: UUID, value: string) => dispatch(setTextValue({
      elementID,
      value,
    })),
  };
}

export default connect(null, mapDispatchToProps)(EditableText);
