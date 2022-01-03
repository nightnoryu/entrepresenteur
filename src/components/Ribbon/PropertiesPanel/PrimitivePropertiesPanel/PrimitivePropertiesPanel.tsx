import React from 'react';
import styles from './PrimitivePropertiesPanel.module.css';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state';
import { ElementType, PrimitiveElement } from '../../../../model/types';
import { RootState } from '../../../../state/reducers';
import { isCurrentElement, isCurrentSlide } from '../../../../model/modelUtils';
import { pickColor } from '../../../../common/fileUtils';

type PrimitivePropertiesPanelProps = {
  currentElement?: PrimitiveElement;
};

function PrimitivePropertiesPanel({ currentElement }: PrimitivePropertiesPanelProps): JSX.Element {
  const dispatch = useDispatch();
  const { setPrimitiveFillColor, setPrimitiveStrokeColor } = bindActionCreators(actionCreators, dispatch);

  const onFillColorPick = () => {
    if (currentElement) {
      pickColor()
        .then(color => setPrimitiveFillColor(currentElement.id, color))
        .catch(error => alert(error));
    }
  };

  const onStrokeColorPick = () => {
    if (currentElement) {
      pickColor()
        .then(color => setPrimitiveStrokeColor(currentElement.id, color))
        .catch(error => alert(error));
    }
  };

  return (
    <ul className={styles.primitivePropertiesPanel}>
      <li className={styles.panelElement}>
        Fill
        <input
          type="color"
          defaultValue={currentElement?.fill}
          onClick={onFillColorPick}
        />
      </li>

      <li className={styles.panelElement}>
        Stroke
        <input
          type="color"
          defaultValue={currentElement?.stroke}
          onClick={onStrokeColorPick}
        />
      </li>
    </ul>
  );
}

function mapStateToProps(state: RootState): PrimitivePropertiesPanelProps {
  for (const slide of state.presentation.slides) {
    if (isCurrentSlide(slide, state.selections.selectedSlideIDs)) {
      for (const element of slide.elements) {
        if (isCurrentElement(element, state.selections.selectedElementIDs) && element.type === ElementType.PRIMITIVE) {
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
