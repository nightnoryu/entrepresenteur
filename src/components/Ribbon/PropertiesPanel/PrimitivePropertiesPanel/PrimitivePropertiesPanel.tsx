import React, { useRef } from 'react';
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
import { getPrimitiveProperties } from '../../../../model/uiParameters/primitiveProperties';
import useEventListener from '../../../../hooks/useEventListener';

type PrimitivePropertiesPanelProps = {
  currentElement?: PrimitiveElement;
};

function PrimitivePropertiesPanel({ currentElement }: PrimitivePropertiesPanelProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    setPrimitiveFillColor,
    setPrimitiveStrokeColor,
    setPrimitiveStrokeStyle,
    setPrimitiveStrokeWidth,
  } = bindActionCreators(actionCreators, dispatch);

  const primitiveProperties = getPrimitiveProperties();

  const fillColorPickerRef = useRef<HTMLInputElement>(null);
  const onFillColorChange = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement;
    if (currentElement) {
      setPrimitiveFillColor(currentElement.id, target.value);
    }
  };
  useEventListener('change', onFillColorChange, fillColorPickerRef);

  const strokeColorPickerRef = useRef<HTMLInputElement>(null);
  const onStrokeColorChange = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement;
    if (currentElement) {
      setPrimitiveStrokeColor(currentElement.id, target.value);
    }
  };
  useEventListener('change', onStrokeColorChange, strokeColorPickerRef);

  const onStrokeStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentElement) {
      setPrimitiveStrokeStyle(currentElement.id, tryMapStringToStrokeStyle(event.currentTarget.value));
    }
  };

  const onStrokeWidthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentElement) {
      const width = parseInt(event.currentTarget.value);
      setPrimitiveStrokeWidth(currentElement.id, width);
    }
  };

  return (
    <ul className={styles.primitivePropertiesPanel}>
      <li className={styles.panelElement}>
        Fill
        <input
          type="color"
          className={styles.colorPicker}
          defaultValue={currentElement?.fill}
          ref={fillColorPickerRef}
        />
      </li>

      <li className={styles.panelElement}>
        Stroke
        <input
          type="color"
          className={styles.colorPicker}
          defaultValue={currentElement?.stroke.color}
          ref={strokeColorPickerRef}
        />
      </li>

      <li className={styles.panelElement}>
        Stroke style
        <select
          value={currentElement?.stroke.style ? mapStrokeStyleToString(currentElement.stroke.style) : undefined}
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

      <li className={styles.panelElement}>
        Stroke width
        <select
          value={currentElement?.stroke.width ? currentElement.stroke.width : undefined}
          onChange={onStrokeWidthChange}
        >
          {primitiveProperties.strokeWidths.map(strokeWidth => (
            <option
              key={strokeWidth}
              value={strokeWidth}
            >
              {strokeWidth}
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
