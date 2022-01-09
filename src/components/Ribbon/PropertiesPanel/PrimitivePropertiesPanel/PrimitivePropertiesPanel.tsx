import React from 'react';
import styles from './PrimitivePropertiesPanel.module.css';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state';
import { ElementType, PrimitiveElement } from '../../../../model/types';
import { RootState } from '../../../../state/reducers';
import {
  isCurrentElement,
  isCurrentSlide,
  mapStrokeStyleToString,
  tryMapStringToStrokeStyle,
} from '../../../../model/modelUtils';
import { pickColor } from '../../../../common/fileUtils';
import { getPrimitiveProperties } from '../../../../model/uiParameters/primitiveProperties';

type PrimitivePropertiesPanelProps = {
  currentElement?: PrimitiveElement;
};

function PrimitivePropertiesPanel({ currentElement }: PrimitivePropertiesPanelProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    setPrimitiveFillColor,
    setPrimitiveStrokeColor,
    setPrimitiveStrokeStyle,
  } = bindActionCreators(actionCreators, dispatch);

  const primitiveProperties = getPrimitiveProperties();

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

  const onStrokeStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentElement) {
      setPrimitiveStrokeStyle(currentElement.id, tryMapStringToStrokeStyle(event.currentTarget.value));
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

      <li className={styles.panelElement}>
        Stroke style
        <select
          name="strokeStyle"
          value={currentElement?.strokeStyle ? mapStrokeStyleToString(currentElement.strokeStyle) : undefined}
          onChange={onStrokeStyleChange}
        >
          {primitiveProperties.strokeStyles.map(strokeStyle => (
            <option
              key={strokeStyle}
              value={strokeStyle}
            >
              {strokeStyle}
            </option>
          ))}
        </select>
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
