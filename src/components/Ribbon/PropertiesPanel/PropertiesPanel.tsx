import React from 'react';
import styles from './PropertiesPanel.module.css';
import { RootState } from '../../../state/reducers';
import { ElementType } from '../../../model/types';
import { isCurrentSlide } from '../../../model/modelUtils';
import { connect } from 'react-redux';
import PrimitivePropertiesPanel from './PrimitivePropertiesPanel/PrimitivePropertiesPanel';
import TextPropertiesPanel from './TextPropertiesPanel/TextPropertiesPanel';

type PropertiesPanelProps = {
  selectedElementType?: ElementType;
};


function PropertiesPanel({ selectedElementType }: PropertiesPanelProps): JSX.Element {
  return (
    <div className={styles.propsPanel}>
      {(() => {
        if (selectedElementType !== undefined) {
          switch (selectedElementType) {
          case ElementType.PRIMITIVE:
            return <PrimitivePropertiesPanel />;
          case ElementType.TEXT:
            return <TextPropertiesPanel />;
          case ElementType.IMAGE:
            break;
          }
        }

        return '';
      })()}
    </div>
  );
}

function mapStateToProps(state: RootState): PropertiesPanelProps {
  if (state.selectedElementIDs.length === 1) {
    for (const slide of state.presentation.slides) {
      if (isCurrentSlide(slide, state.selectedSlideIDs)) {
        for (const element of slide.elements) {
          if (element.id === state.selectedElementIDs[0]) {
            return {
              selectedElementType: element.type,
            };
          }
        }
      }
    }
  }

  return {
    selectedElementType: undefined,
  };
}

export default connect(mapStateToProps)(PropertiesPanel);
