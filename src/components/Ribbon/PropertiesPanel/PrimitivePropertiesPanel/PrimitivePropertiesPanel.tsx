import React from 'react';
import styles from './PrimitivePropertiesPanel.module.css';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state';
import { ElementType, PrimitiveElement } from '../../../../model/types';
import { RootState } from '../../../../state/reducers';
import { isCurrentElement, isCurrentSlide } from '../../../../model/modelUtils';

type PrimitivePropertiesPanelProps = {
  currentElement?: PrimitiveElement;
};

function PrimitivePropertiesPanel({ currentElement }: PrimitivePropertiesPanelProps): JSX.Element {
  const dispatch = useDispatch();
  const { setPrimitiveFillColor, setPrimitiveStrokeColor } = bindActionCreators(actionCreators, dispatch);

  const onFillColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentElement) {
      setPrimitiveFillColor(currentElement.id, event.currentTarget.value);
    }
  };

  const onStrokeColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentElement) {
      setPrimitiveStrokeColor(currentElement.id, event.currentTarget.value);
    }
  };

  return (
    <ul className={styles.primitivePropertiesPanel}>
      <li className={styles.panelElement}>
        Fill
        <input
          type="color"
          defaultValue={currentElement?.fill}
          onInput={onFillColorChange}
        />
      </li>

      <li className={styles.panelElement}>
        Stroke
        <input
          type="color"
          defaultValue={currentElement?.stroke}
          onInput={onStrokeColorChange}
        />
      </li>
    </ul>
  );
}

function mapStateToProps(state: RootState): PrimitivePropertiesPanelProps {
  for (const slide of state.presentation.slides) {
    if (isCurrentSlide(slide, state.selectedSlideIDs)) {
      for (const element of slide.elements) {
        if (isCurrentElement(element, state.selectedElementIDs) && element.type === ElementType.PRIMITIVE) {
          return {
            currentElement: element,
          };
        }
      }
    }
  }

  return {
    currentElement: undefined,
  };
}

export default connect(mapStateToProps)(PrimitivePropertiesPanel);
