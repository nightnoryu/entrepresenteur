import React, { useRef } from 'react';
import styles from './PrimitivePropertiesPanel.module.css';
import { connect, useDispatch, useSelector } from 'react-redux';
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
import useColorPicker from '../../../../hooks/propsPanels/useColorPicker';
import i18n_get from '../../../../i18n/i18n_get';

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
  const locale = useSelector((editor: RootState) => editor.locale);

  const primitiveProperties = getPrimitiveProperties();

  const fillColorPickerRef = useRef<HTMLInputElement>(null);
  useColorPicker(fillColorPickerRef, color => {
    if (currentElement) {
      setPrimitiveFillColor(currentElement.id, color);
    }
  });

  const strokeColorPickerRef = useRef<HTMLInputElement>(null);
  useColorPicker(strokeColorPickerRef, color => {
    if (currentElement) {
      setPrimitiveStrokeColor(currentElement.id, color);
    }
  });

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
        {i18n_get(locale, 'primitive.fill')}
        <span
          className={styles.colorPickerWrapper}
          onClick={() => fillColorPickerRef.current?.click()}
          style={{
            backgroundColor: currentElement?.fill,
          }}
        >
          <input
            type="color"
            className={styles.colorPicker}
            defaultValue={currentElement?.fill}
            ref={fillColorPickerRef}
          />
        </span>
      </li>

      <li className={styles.panelElement}>
        {i18n_get(locale, 'primitive.stroke')}
        <span
          className={styles.colorPickerWrapper}
          onClick={() => strokeColorPickerRef.current?.click()}
          style={{
            backgroundColor: currentElement?.stroke.color,
          }}
        >
          <input
            type="color"
            className={styles.colorPicker}
            defaultValue={currentElement?.fill}
            ref={strokeColorPickerRef}
          />
        </span>
      </li>

      <li className={styles.panelElement}>
        {i18n_get(locale, 'primitive.stroke_style')}
        <select
          className={styles.selection}
          value={currentElement?.stroke.style ? mapStrokeStyleToString(currentElement.stroke.style) : undefined}
          onChange={onStrokeStyleChange}
        >
          {primitiveProperties.strokeStyles.map(strokeStyle => (
            <option
              key={strokeStyle}
              value={strokeStyle}
            >
              {i18n_get(locale, strokeStyle)}
            </option>
          ))}
        </select>
      </li>

      <li className={styles.panelElement}>
        {i18n_get(locale, 'primitive.stroke_width')}
        <select
          className={styles.selection}
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
